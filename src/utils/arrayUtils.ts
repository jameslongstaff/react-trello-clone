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

const move = <T>(
  arr: Array<(T & { id: string }) | undefined>,
  oldIndex: number,
  newIndex: number
): T[] => {
  if (newIndex >= arr.length) {
    var k = newIndex - arr.length + 1;

    while (k--) {
      arr.push(undefined);
    }
  }

  const clone = structuredClone(arr);

  clone.splice(newIndex, 0, clone.splice(oldIndex, 1)[0]);

  return clone as T[];
};

export { removeById, getById, insert, move };
