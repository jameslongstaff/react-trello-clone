import "./App.css";
import Board from "./components/Board/Board";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faPlus, faEllipsis);

function App() {
  return (
    <div className="bg-[#b04632] h-[100vh] w-full p-5">
      <Board></Board>
    </div>
  );
}

export default App;
