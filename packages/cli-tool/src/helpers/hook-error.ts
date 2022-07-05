type Result = { failures: { error: Error }[] };

export const hookFailed = ({failures}: Result): boolean => {
  return Boolean(failures[0])
}

export const formatHookErrorMsg = ({failures}: Result): string => {
  if (failures[0]) {
    return `${failures[0].error.name}: ${failures[0].error.message}`
  }

  return 'Something went wrong...'
}
