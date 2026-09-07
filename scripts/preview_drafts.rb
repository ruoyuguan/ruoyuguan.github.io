#!/usr/bin/env ruby
# Local-only draft preview; does not change the production configuration.
require 'yaml'
require 'date'
require 'tempfile'
require 'rbconfig'

root = File.expand_path('..', __dir__)
mode = ARGV.delete('--build') ? 'build' : 'serve'
Dir.chdir(root) do
  config = YAML.safe_load_file('_config.yml', permitted_classes: [Date, Time], aliases: true)
  config['exclude'] -= ['images/portfolio']
  config['unpublished'] = true
  config['future'] = true
  config['analytics'] = { 'provider' => false }
  config['url'] = 'http://127.0.0.1:4001'
  config['host'] = '127.0.0.1'
  config['port'] = 4001
  config['destination'] = File.join(root, '_site-preview')
  Tempfile.create(['ruoyu-draft-preview-', '.yml']) do |file|
    file.write(YAML.dump(config))
    file.flush
    puts 'Drafts: http://127.0.0.1:4001/photography-drafts/'
    system(RbConfig.ruby, '-S', 'bundle', 'exec', 'jekyll', mode, '--config', file.path)
    exit($?.exitstatus || 1)
  end
end
