import React, { useCallback, useEffect, useRef, useState } from "react";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";
import ListCreator from "./ListCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardModal from "../Card/CardModal";
import {
  CancelDrop,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import customCollisionStrategy from "../../utils/customCollisionStrategy";
import { findContainer, getNewIndex } from "../../utils/dndUtils";
import List from "../List/List";
import { createPortal } from "react-dom";
import Card from "../Card/Card";
import DraggableList from "../List/DraggableList";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    const board = getBoard();

    const listsById = board.lists.reduce((acc: any, curr: any) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    boardStore.setBoard({ title: board.title });
    boardStore.setListsById(listsById);
    boardStore.setLists(board.lists.map((list) => list.id));
  }, []);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [clonedItems, setClonedItems] = useState<any | null>(null);

  const lastOverId = useRef<string | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      const opts = {
        activeId,
        items: boardStore.listsById,
        lastOverId,
        recentlyMovedToNewContainer,
      };

      return customCollisionStrategy(args, opts);
    },
    [activeId, boardStore.listsById]
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const clearAll = () => {
    localStorage.clear();
    boardStore.resetBoard();
  };

  const handleDragStart = (params: DragStartEvent) => {
    setActiveId(params.active.id as string);
    setClonedItems(boardStore.listsById);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in boardStore.listsById) {
      return;
    }

    const [overListId, activeListId] = [
      findContainer(overId as string, boardStore.listsById)!,
      findContainer(active.id as string, boardStore.listsById)!,
    ];

    if (!overListId || !activeListId) {
      return;
    }

    if (activeListId !== overListId) {
      const overListCards = boardStore.listsById[overListId].cards;

      const overListCardIndex = overListCards.findIndex(
        (card) => card.id === overId
      );

      const isOverEmptyList = (overId as string) in boardStore.lists;

      const newIndex = !isOverEmptyList
        ? getNewIndex(overListCardIndex, over, active)
        : 0;

      recentlyMovedToNewContainer.current = true;

      const activeList = boardStore.listsById[activeListId];
      const overList = boardStore.listsById[overListId];

      // boardStore.moveCardToList({
      //   cardId: active.id as string,
      //   fromList: activeList,
      //   toList: overList,
      //   pos: newIndex,
      // });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    // if moving lists
    if (active.id in boardStore.listsById && over?.id) {
      const activeIndex = boardStore.lists.indexOf(active.id as string);
      const overIndex = boardStore.lists.indexOf(over.id as string);

      boardStore.moveList({
        fromList: boardStore.listsById[active.id],
        toList: boardStore.listsById[over.id],
        fromIndex: activeIndex,
        toIndex: overIndex,
      });

      setActiveId(null);

      return;
    }

    const activeContainer = findContainer(
      active.id as string,
      boardStore.listsById
    );

    const overId = over?.id;

    if (!activeContainer || overId == null) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId as string, boardStore.listsById);

    if (overContainer) {
      const activeIndex = boardStore.listsById[activeContainer].cards.findIndex(
        (card) => card.id === active.id
      );

      const overIndex = boardStore.listsById[overContainer].cards.findIndex(
        (card) => card.id === overId
      );

      if (activeIndex !== overIndex) {
        boardStore.moveList({
          fromList: boardStore.listsById[activeContainer],
          toList: boardStore.listsById[overContainer],
          fromIndex: activeIndex,
          toIndex: overIndex,
        });
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      boardStore.setListsById(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  function renderListOverlay(listId: string) {
    const list = boardStore.listsById[listId];

    return <List list={list} />;
  }

  function renderCardDragOverlay(id: string) {
    const listId = findContainer(id, boardStore.listsById)!;

    const card = boardStore.listsById[listId].cards.find(
      (card) => card.id === id
    )!;

    return <Card card={card} />;
  }

  return !!boardStore.board ? (
    <DndContext
      sensors={[mouseSensor]}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="inline-flex">
        <div>
          <BoardTitle title={boardStore.board.title} />
        </div>
        <button
          className="text-white ml-2 bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px]"
          onClick={clearAll}
        >
          <FontAwesomeIcon className="mr-2" icon={["fas", "xmark"]} />
          Clear all
        </button>
      </div>
      <div className="w-full">
        <div className="mt-4 flex-nowrap inline-flex">
          <SortableContext items={boardStore.lists}>
            {boardStore.lists.map((listId: string) => {
              return (
                <DraggableList
                  key={listId}
                  list={boardStore.listsById[listId]}
                />
              );
            })}
          </SortableContext>

          <ListCreator></ListCreator>
        </div>
      </div>

      {createPortal(
        <DragOverlay>
          {activeId
            ? boardStore.lists.includes(activeId)
              ? renderListOverlay(activeId)
              : renderCardDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}

      <CardModal />
    </DndContext>
  ) : (
    <p>No board</p>
  );
};

export default Board;
