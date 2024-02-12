import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import { useState } from "react";
import Modal from "./Modal";

export default function ListItem({ task }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}
        <ProgressBar></ProgressBar></p>
      </div>

      <div className="button-container">
        <button className="edit" onClick={()=>setShowModal(true)}>Edit</button>
        <button className="delete">Delete</button>
      </div>

      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task ={task}></Modal>}
    </li>
  );
}
