import utils from "../utils";

function StarDisplay(props) {
  return (
    <>
      {utils.range(1, props.count).map((starId) => (
        <div key={starId.toString()} className="star" />
      ))}
    </>
  );
}

export default StarDisplay;
