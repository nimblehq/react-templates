const getChoices = <T>(
  options: Map<T, string>,
): { value: T; name: string }[] => {
  return [...options].map((option: [T, string]) => {
    return { value: option[0], name: option[1] };
  });
};

export default getChoices;
