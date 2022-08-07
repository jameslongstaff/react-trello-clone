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
  const clonedItems = structuredClone(items);

  clonedItems.splice(index, 0, item);

  return clonedItems;
};

export { removeById, getById, insert };
