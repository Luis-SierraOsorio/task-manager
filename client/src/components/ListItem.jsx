import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"

export default function ListItem({ task }) {
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}
        <ProgressBar></ProgressBar></p>
      </div>

      <div className="button-container">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </li>
  );
}
