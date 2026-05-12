---
title: "Scientific Textbook Proofreading Skill: A Pre-release of an AI-agent Skill for Scientific Errata Auditing"
date: 2026-05-12
permalink: /posts/2026/05/scientific-textbook-proofreading-skill-pre-release/
tags:
  - open-source
  - AI
  - scientific-writing
  - textbook-proofreading
  - high-energy-astrophysics
toc: true
---

> **TL;DR:** I have released a pre-release version of **Scientific Textbook Proofreading Skill**, an open-source AI-agent skill for structured scientific textbook proofreading and errata auditing. It is designed to help produce traceable candidate errata for human expert review, with particular attention to formula correctness, dimensional consistency, physical assumptions, notation consistency, outdated scientific claims, and misleading scientific prose.

<a id="top"></a>

## Scientific Textbook Proofreading Skill: A Pre-release of an AI-agent Skill for Scientific Errata Auditing

I have been working on an open-source project called **Scientific Textbook Proofreading Skill**, now available as a pre-release.

It is a reusable AI-agent skill for scientific textbook proofreading and errata auditing, with an emphasis on formula correctness, dimensional consistency, physical assumptions, notation consistency, outdated scientific claims, and misleading scientific prose.

The project was motivated by a real proofreading task. During the spring semester, I took the **High-Energy Astrophysics** course at **Huazhong University of Science and Technology (HUST)**, and assisted **Prof. Yuan-Chuan Zou** and his colleagues in proofreading a Chinese textbook manuscript on high-energy astrophysics led by faculty members of the Department of Astronomy at HUST.

My goal is to make AI-assisted scientific proofreading more structured and conservative: not replacing expert judgment, but helping produce traceable candidate errata for human review.

The current version includes structured report templates, output contracts, a JSON schema, synthetic examples, lightweight evaluation cases, and CI checks.

GitHub repository:

[Scientific Textbook Proofreading Skill](https://github.com/ruoyuguan/scientific-textbook-proofreading-skill)

I would be grateful for feedback from researchers, educators, textbook authors, and anyone interested in reliable AI-assisted scientific workflows.

---

## Why this project matters

Scientific textbook proofreading is not merely a matter of correcting typos. In physics, astronomy, and other quantitative sciences, a seemingly minor error in a formula, unit convention, scaling relation, sign, exponent, or physical assumption may mislead students and readers for years.

At the same time, scientific textbooks are difficult to audit systematically. A careful reviewer often needs to check several layers at once:

- whether the formula is mathematically correct;
- whether the dimensions are consistent;
- whether the notation is used consistently across chapters;
- whether the physical assumptions are explicitly stated;
- whether the statement is still scientifically up to date;
- whether the prose may mislead readers even if the formula itself is formally correct.

The purpose of this project is therefore not to automate scientific judgment away. Instead, it aims to provide a conservative and structured workflow in which an AI agent can help identify candidate issues, organize evidence, and produce auditable reports for human experts.

## Design philosophy

The core principle of this project is **traceability over confidence**.

For scientific proofreading, an AI system should not simply say that something is “wrong” or “correct.” It should explain what it checked, what assumptions it used, what evidence supports the claim, and what level of confidence or uncertainty remains.

In this sense, the project treats AI-assisted proofreading as a form of **candidate errata generation** rather than final authority. The human author, editor, or domain expert remains responsible for deciding whether a reported issue is indeed an error and how it should be corrected.

## Current status

The current pre-release includes:

- structured report templates;
- output contracts for proofreading reports;
- a JSON schema for machine-readable outputs;
- synthetic examples;
- lightweight evaluation cases;
- continuous-integration checks.

This is still an early-stage project, but I hope it can become useful for people who care about scientific accuracy, textbook writing, and reliable AI-assisted research workflows.

## Feedback welcome

Feedback from researchers, educators, textbook authors, students, and open-source contributors would be very welcome.

In particular, I would appreciate comments on:

- whether the report structure is useful for real textbook proofreading;
- whether the output contract is sufficiently conservative;
- whether the examples and evaluation cases reflect realistic scientific-editing scenarios;
- how to make the workflow more reliable, transparent, and maintainable.

Project link:

[https://github.com/ruoyuguan/scientific-textbook-proofreading-skill](https://github.com/ruoyuguan/scientific-textbook-proofreading-skill)

[Back to top](#top)
