import "./App.css";
import StarDisplay from "./components/star-display";
import PlayNumber from "./components/play-number";
import PlayAgain from "./components/play-again";

function App() {
  const onNumberClick = (number, status) => {
    console.log(number, status);
  };

  return (
    <>
      <StarDisplay count={9} />
      <PlayNumber number={1} status={"used"} onClick={onNumberClick} />
      <PlayAgain gameStatus={"lost"} onClick={() => {}} />
    </>
  );
}

export default App;
