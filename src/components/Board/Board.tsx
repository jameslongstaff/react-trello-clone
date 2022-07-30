import React, { useEffect } from "react";
import ListType from "../../types/ListType";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard, moveList } from "../../utils/persistence";
import ListCreator from "./ListCreator";
import ListContainer from "./ListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardModal from "../Card/CardModal";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    const board = getBoard();
    boardStore.setBoard(board);
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const clearAll = () => {
    localStorage.clear();
    boardStore.resetBoard();
  };

  const handleDragOver = (params: any) => {
    const [src, dest] = [params?.active?.id, params?.over?.id];

    if (src && dest) {
      const board = moveList(dest, src);
      boardStore.setBoard(board);
    }
  };

  return !!boardStore.board ? (
    <DndContext
      onDragEnd={handleDragOver}
      collisionDetection={closestCenter}
      sensors={[mouseSensor]}
    >
      <SortableContext
        items={boardStore.board.lists}
        strategy={horizontalListSortingStrategy}
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
            {boardStore.board.lists.map((list: ListType) => {
              return <ListContainer key={list.id} list={list} />;
            })}

            <ListCreator></ListCreator>
          </div>
        </div>
        <CardModal />
      </SortableContext>
    </DndContext>
  ) : (
    <p>No board</p>
  );
};

export default Board;
