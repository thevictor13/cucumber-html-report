const report = require('./lib/index')
const opts = {
  // source json
  source: './testdata/big_error_and_screenshot.json',
  // target directory (will create if not exists)
  dest: './reports',
  // report file name (will be index.html if not exists)
  name: 'index.html',
  // your custom mustache template (uses default if not specified)
  // template: './custom_template.html',
  // Title for default template. (default is Cucumber Report)
  title: 'Test Report',
  // Subtitle for default template. (default is empty)
  component: 'Some Awesome Component',
  // Path to the displayed logo.
  logo: './logos/cucumber-logo.svg',
  // Path to the directory of screenshots. Optional.
  screenshots: './screenshots'
}
report.create(opts)
  .then(console.log)
  .catch(console.error)

