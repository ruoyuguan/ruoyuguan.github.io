#!/usr/bin/env ruby
# Generate web derivatives of explicitly published photos; originals stay intact.
require 'yaml'
require 'date'
require 'fileutils'
require 'tmpdir'

root = File.expand_path('..', __dir__)
Dir.chdir(root) do
  abort 'Install cwebp (libwebp) before running this script.' unless system('cwebp', '-version', out: File::NULL)
  FileUtils.mkdir_p('images/photography')
  Dir.glob('_portfolio/*.{md,html}').sort.each do |path|
    front = File.read(path).split(/^---\s*$\n?/, 3)[1]
    next unless front
    photo = YAML.safe_load(front, permitted_classes: [Date, Time])
    next unless photo['published'] == true
    id = photo.fetch('image')
    abort "Invalid image identifier in #{path}" unless id.match?(/\A[a-zA-Z0-9_-]+\z/)
    source = "images/portfolio/#{id}.jpg"
    abort "Missing original #{source}" unless File.file?(source)
    Dir.mktmpdir('ruoyu-photo-') do |temporary|
      # Normalize the camera orientation before cwebp removes EXIF metadata.
      if photo['image_rotation']
        rotation = Integer(photo['image_rotation'])
        abort "Use a quarter-turn rotation in #{path}" unless [90, 180, 270].include?(rotation)
        normalized = File.join(temporary, 'upright.png')
        abort 'Orientation normalization requires macOS sips.' unless system('sips', '-s', 'format', 'png', '-r', rotation.to_s, source, '--out', normalized, out: File::NULL)
        source = normalized
      end
      [480, 960, 1600, 2400].each do |width|
        output = "images/photography/#{id}-#{width}.webp"
        abort "Image conversion failed: #{output}" unless system('cwebp', '-quiet', '-q', '82', '-m', '6', '-resize', width.to_s, '0', source, '-o', output)
        puts "#{output}: #{File.size(output)} bytes"
      end
    end
  end
  [175, 350].each do |width|
    output = "images/profile-#{width}.webp"
    abort "Image conversion failed: #{output}" unless system('cwebp', '-quiet', '-q', '85', '-m', '6', '-resize', width.to_s, '0', 'images/profile.png', '-o', output)
    puts "#{output}: #{File.size(output)} bytes"
  end
end
