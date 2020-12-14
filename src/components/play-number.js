const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

const PlayNumber = ({ number, status, onClick }) => (
  <button
    className="number"
    style={{ backgroundColor: colors[status] }}
    onClick={() => onClick(number, status)}
    disabled={status === "used"}
  >
    {number}
  </button>
);

export default PlayNumber;
