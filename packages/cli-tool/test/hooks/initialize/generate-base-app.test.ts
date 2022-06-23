import {expect, test} from '@oclif/test'

describe('hooks', () => {
  test
  .stdout()
  .hook('init', {appName: 'my-app'})
  .do(output => {
    expect(output.stdout).to.contain('Creating a new React app in')
  })
  .it('shows a message')
})
