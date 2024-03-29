import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBoardStore from "../../hooks/useBoardStore";
import EditableTitle from "../EditableTitle";

const CardModal = () => {
  const boardStore = useBoardStore();

  const closeModal = () => {
    boardStore.resetCardModal();
  };

  const card = boardStore.cardModal.card;

  return card ? (
    <div className="absolute h-[100vh] w-full top-0 left-0 z-20">
      <div className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]" onClick={closeModal}></div>
      <div className="w-4/6 mt-[48px] mb-[80px] mx-auto bg-[#f4f5f7] relative z-20 rounded-[3px] px-6 py-4">
        <div className="flex mb-4">
          <EditableTitle className="text-xl font-semibold" title={card.title} tag="h2" />
          <button className="ml-auto" onClick={closeModal}>
            <FontAwesomeIcon
              className="text-[#6b778c] w-[1.25rem] h-[1.25rem]"
              icon={["fas", "xmark"]}
            />
          </button>
        </div>

        <div className="flex">
          <h3 className="font-semibold ">Description</h3>
          <button className="py-1 px-4 text-sm rounded-[3px] ml-3 bg-[#091e420a] hover:bg-[#091e4214] text-[#172b4d] hover:text-[#091e42]">
            Edit
          </button>
        </div>

        <p>{card.content || ""}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CardModal;
