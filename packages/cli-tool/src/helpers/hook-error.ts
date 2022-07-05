import {Hook} from '@oclif/core'

export const hookFailed = (result :Hook.Result<any>):boolean => {
  return Boolean(result.failures[0])
}

export const formatHookErrorMsg = (result :Hook.Result<any>):string => {
  if (result.failures[0]) {
    return `${result.failures[0].error.name}: ${result.failures[0].error.message}`
  }

  return 'Something went wrong...'
}
