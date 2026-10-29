#!/usr/bin/env python3
"""Check that archived tools cannot run, without executing their legacy bodies."""

import ast
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[1]
PYTHON_ARCHIVES = (
    "scripts/cv_markdown_to_json.py",
    "markdown_generator/publications.py",
    "markdown_generator/talks.py",
    "markdown_generator/pubsFromBib.py",
)
NOTEBOOK_ARCHIVES = (
    "markdown_generator/publications.ipynb",
    "markdown_generator/talks.ipynb",
    "markdown_generator/PubsFromBib.ipynb",
    "markdown_generator/OrcidToBib.ipynb",
    "talkmap.ipynb",
    "talkmap_out.ipynb",
)


def executable_notebook_source(source):
    """Replace IPython shell/magic lines with unreachable failure sentinels.

    The actual guard must remain first. No IPython dependency, package install,
    network request, or archived generator body is needed to verify the guard.
    A future import placed below the guard will fail compilation and this test.
    """
    lines = []
    for line in source.splitlines(keepends=True):
        stripped = line.lstrip()
        if stripped.startswith(("!", "%")):
            indent = line[:len(line) - len(stripped)]
            line = indent + 'raise AssertionError("Archived notebook magic reached")\n'
        lines.append(line)
    return "".join(lines)


class LegacyArchivesTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="legacy-archives-")
        self.addCleanup(self.temporary.cleanup)
        self.fixture = Path(self.temporary.name)
        for directory in ("_publications", "_talks", "_data", "talkmap", "files"):
            folder = self.fixture / directory
            folder.mkdir()
            (folder / "keep.txt").write_text("Existing content must stay intact.\n")
        self.before = self.snapshot()

    def snapshot(self):
        return {
            str(path.relative_to(self.fixture)): (
                hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None
            )
            for path in self.fixture.rglob("*")
        }

    def assert_constant_guard(self, source):
        """Refuse to execute any fixture unless its first statement is safe."""
        tree = ast.parse(source)
        statements = tree.body
        if statements and isinstance(statements[0], ast.Expr):
            expression = statements[0].value
            if isinstance(expression, ast.Constant) and isinstance(expression.value, str):
                statements = statements[1:]
        self.assertTrue(statements, "Archive is missing an execution guard")
        guard = statements[0]
        self.assertIsInstance(guard, ast.Raise)
        self.assertIsNone(guard.cause)
        self.assertIsInstance(guard.exc, ast.Call)
        self.assertIsInstance(guard.exc.func, ast.Name)
        self.assertEqual(guard.exc.func.id, "SystemExit")
        self.assertEqual(len(guard.exc.args), 1)
        self.assertEqual(guard.exc.keywords, [])
        message = guard.exc.args[0]
        self.assertIsInstance(message, ast.Constant)
        self.assertIsInstance(message.value, str)
        self.assertIn("Retired:", message.value)
        self.assertIn("MAINTENANCE.md", message.value)

    def assert_refused(self, command):
        result = subprocess.run(
            command,
            cwd=self.fixture,
            stdin=subprocess.DEVNULL,
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(result.stdout, "")
        self.assertIn("Retired:", result.stderr)
        self.assertIn("MAINTENANCE.md", result.stderr)
        self.assertNotIn("Traceback", result.stderr)
        self.assertEqual(self.snapshot(), self.before, "An archive changed fixture files")

    def test_python_entrypoints_and_imports_are_disabled(self):
        for name in PYTHON_ARCHIVES:
            with self.subTest(archive=name):
                path = ROOT / name
                self.assert_constant_guard(path.read_text())
                self.assert_refused([sys.executable, "-I", "-B", str(path)])
                self.assert_refused([
                    sys.executable, "-I", "-B", str(path),
                    "--input", "cv.md", "--output", "_data/cv.json", "--config", "config.yml",
                ])
                self.assert_refused([
                    sys.executable, "-I", "-B", "-c",
                    "import runpy, sys; runpy.run_path(sys.argv[1], run_name='archive_import')",
                    str(path),
                ])

    def test_wrapper_stops_before_path_resolution(self):
        path = ROOT / "scripts/update_cv_json.sh"
        executable = [
            line.strip() for line in path.read_text().splitlines()
            if line.strip() and not line.lstrip().startswith("#")
        ]
        self.assertEqual(executable[0],
            "printf '%s\\n' 'Retired: JSON-CV conversion is disabled. Maintain _pages/cv.md "
            "and export the PDF with scripts/export_cv.mjs; see MAINTENANCE.md.' >&2")
        self.assertEqual(executable[1], "exit 1")
        self.assert_refused(["bash", str(path)])

    def test_every_notebook_cell_is_disabled_independently(self):
        for name in NOTEBOOK_ARCHIVES:
            with self.subTest(notebook=name):
                notebook = json.loads((ROOT / name).read_text())
                notice = notebook["cells"][0]
                self.assertEqual(notice["cell_type"], "markdown")
                self.assertIn("Retired notebook", "".join(notice["source"]))
                self.assertIn("saved outputs are historical", "".join(notice["source"]))
                count = 0
                for index, cell in enumerate(notebook["cells"]):
                    if cell["cell_type"] != "code":
                        continue
                    count += 1
                    with self.subTest(notebook=name, cell=index):
                        source = cell["source"]
                        source = "".join(source) if isinstance(source, list) else source
                        self.assertTrue(source.startswith("raise SystemExit("))
                        transformed = executable_notebook_source(source)
                        self.assert_constant_guard(transformed)
                        self.assert_refused([sys.executable, "-I", "-B", "-c", transformed])
                self.assertGreater(count, 0)

    def test_retired_layout_does_not_render_legacy_content(self):
        layout = (ROOT / "_layouts/cv-layout.html").read_text()
        active, archived = layout.split("{% comment %}", 1)
        history, suffix = archived.split("{% endcomment %}", 1)
        self.assertTrue(active.startswith("---\nlayout: default\n---\n"))
        self.assertIn("Legacy CV layout retired", active)
        self.assertIn("'/cv/' | relative_url", active)
        self.assertNotIn("{{ content }}", active + suffix)
        self.assertNotIn("<head", active + suffix)
        self.assertNotIn("include head", active + suffix)
        self.assertIn("---\nlayout: compress\n---", history)
        self.assertIn("{{ content }}", history)
        self.assertEqual(suffix.strip(), "")


if __name__ == "__main__":
    unittest.main()
