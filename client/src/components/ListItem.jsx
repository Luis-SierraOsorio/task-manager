import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { useState } from "react";

export default function ListItem({ task, getData }) {
  // state for the modal, gets called in here as edit
  const [showModal, setShowModal] = useState(false);

  // function to delete an item from the list
  async function deleteItem() {
    try {
      // fetching specific item on the backend to delete
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE",
      });
      // if deleted then we simply redisplay the new information
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">
          {task.title}
          <ProgressBar></ProgressBar>
        </p>
      </div>

      <div className="button-container">
        {/* edit button */}
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        {/* delete button */}
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>

      {/* showing modal only if set to true */}
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        ></Modal>
      )}
    </li>
  );
}
