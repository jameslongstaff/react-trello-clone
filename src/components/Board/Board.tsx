import React, { useCallback, useEffect, useRef, useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";
import ListCreator from "./ListCreator";
import CardModal from "../Card/CardModal";
import {
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
import { findCardById, findContainer, getNewIndex } from "../../utils/dndUtils";
import List from "../List/List";
import { createPortal } from "react-dom";
import Card from "../Card/Card";
import DraggableList from "../List/DraggableList";
import CardType from "../../types/CardType";
import BoardTopBar from "./BoardTopBar";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    boardStore.initBoard(getBoard());
  }, []);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
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

  const setInactive = () => {
    setActiveCard(null);
    setActiveId(null);
  };

  const isList = (id: string) => {
    return boardStore.lists.includes(id);
  };

  const handleDragStart = (params: DragStartEvent) => {
    setActiveId(params.active.id as string);

    if (!isList(params.active.id as string)) {
      const card = findCardById(
        params.active.id as string,
        boardStore.listsById
      );

      if (card) setActiveCard(card);
    }

    setClonedItems(boardStore.listsById);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || isList(active.id as string)) {
      return;
    }

    const [overListId, activeListId] = [
      findContainer(overId as string, boardStore.listsById)!,
      findContainer(active.id as string, boardStore.listsById)!,
    ];

    if (!overListId || !activeListId) {
      return;
    }

    const overDifferentList = activeListId !== overListId;
    const overCurrentList = activeListId === overListId;

    if (!(overCurrentList || overDifferentList)) {
      return;
    }

    const overListCardIndex = boardStore.listsById[overListId].cards.findIndex(
      ({ id }) => id === overId
    );

    const newIndex = getNewIndex(overListCardIndex, over, active);

    recentlyMovedToNewContainer.current = true;

    const activeList = boardStore.listsById[activeListId];

    if (overCurrentList) {
      boardStore.moveCard({
        cardId: active.id as string,
        list: activeList,
        pos: newIndex,
      });

      return;
    }

    const overList = boardStore.listsById[overListId];

    boardStore.moveCardToList({
      cardId: active.id as string,
      fromList: activeList,
      toList: overList,
      pos: newIndex,
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in boardStore.listsById && over?.id) {
      const activeIndex = boardStore.lists.indexOf(active.id as string);
      const overIndex = boardStore.lists.indexOf(over.id as string);

      boardStore.moveList({
        fromList: boardStore.listsById[active.id],
        toList: boardStore.listsById[over.id],
        fromIndex: activeIndex,
        toIndex: overIndex,
      });
    }

    setInactive();
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      boardStore.setListsById(clonedItems);
    }

    setInactive();

    setClonedItems(null);
  };

  function renderListOverlay(listId: string) {
    const list = boardStore.listsById[listId];

    return <List list={list} />;
  }

  function renderCardDragOverlay() {
    if (activeCard) {
      return <Card card={activeCard} />;
    }

    return undefined;
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
      <BoardTopBar />

      <div className="w-full mt-4 flex-nowrap inline-flex">
        <SortableContext items={boardStore.lists}>
          {boardStore.lists.map((listId: string) => {
            return (
              <DraggableList key={listId} list={boardStore.listsById[listId]} />
            );
          })}
        </SortableContext>

        <ListCreator></ListCreator>
      </div>

      {createPortal(
        <DragOverlay
          dropAnimation={{
            duration: 25,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeId
            ? boardStore.lists.includes(activeId)
              ? renderListOverlay(activeId)
              : renderCardDragOverlay()
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
