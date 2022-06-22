import {expect, test} from '@oclif/test'

describe('generate', () => {
  test
  .stdout()
  .command(['generate'])
  .it('Throw an error', ctx => {
    expect(ctx.stdout).to.throw(Error, 'Error: command generator not found')
  })

  test
  .stdout()
  .command(['generate', 'app-name'])
  .it('generates an app with the given name', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
