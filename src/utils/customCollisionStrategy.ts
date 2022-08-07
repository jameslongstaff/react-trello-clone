import { closestCenter, getFirstCollision, pointerWithin, rectIntersection } from "@dnd-kit/core";
import { ListsByIdType } from "../types/StoreTypes";

export default (
  args: any,
  opts: {
    activeId: any;
    items: ListsByIdType;
    lastOverId: any;
    recentlyMovedToNewContainer: any;
  }
) => {
  if (opts.activeId && opts.activeId in opts.items) {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container: any) => container.id in opts.items
      )
    });
  }

  // Start by finding any intersecting droppable
  const pointerIntersections = pointerWithin(args);
  const intersections =
    pointerIntersections.length > 0
      ? // If there are droppables intersecting with the pointer, return those
        pointerIntersections
      : rectIntersection(args);

  let overId = getFirstCollision(intersections, "id");

  if (overId != null) {
    if (overId in opts.items) {
      const containerItems = opts.items[overId];

      // If a container is matched and it contains items (columns 'A', 'B', 'C')
      if (containerItems.cards.length > 0) {
        // Return the closest droppable within that container
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container: any) =>
              container.id !== overId &&
              !!containerItems.cards.find((card) => card.id === container.id)
          )
        })[0]?.id;
      }
    }

    opts.lastOverId.current = overId;

    return [{ id: overId }];
  }

  // When a draggable item moves to a new container, the layout may shift
  // and the `overId` may become `null`. We manually set the cached `lastOverId`
  // to the id of the draggable item that was moved to the new container, otherwise
  // the previous `overId` will be returned which can cause items to incorrectly shift positions
  if (opts.recentlyMovedToNewContainer.current) {
    opts.lastOverId.current = opts.activeId;
  }

  // If no droppable is matched, return the last match
  return opts.lastOverId.current ? [{ id: opts.lastOverId.current }] : [];
};
