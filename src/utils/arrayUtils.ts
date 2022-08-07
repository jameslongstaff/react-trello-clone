const removeById = <T>(items: Array<T & { id: string }>, id: string): T[] => {
  return items.filter((item) => item.id !== id);
};

const getById = <T>(
  items: Array<T & { id: string }>,
  id: string
): T | undefined => {
  return items.find((item) => item.id === id);
};

const insert = <T>(
  items: Array<T & { id: string }>,
  item: T & { id: string },
  index: number
): T[] => {
  return items.splice(index, 0, item);
};

export { removeById, getById, insert };
