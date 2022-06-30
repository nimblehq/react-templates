const getChoices = (options: {
  [key: string]: string;
}): { value: string; name: string }[] => {
  return Object.keys(options).map((key: string) => {
    return {value: key, name: options[key]}
  })
}

export default getChoices
