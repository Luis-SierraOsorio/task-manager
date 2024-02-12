import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import { useState } from "react";
import Modal from "./Modal";


export default function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false)

  async function deleteItem(){
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
        method: 'DELETE'
      })
      if (response.status === 200){
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon></TickIcon>
        <p className="task-title">{task.title}
        <ProgressBar></ProgressBar></p>
      </div>

      <div className="button-container">
        <button className="edit" onClick={()=>setShowModal(true)}>Edit</button>
        <button className="delete" onClick={deleteItem}>Delete</button>
      </div>

      {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task ={task} getData={getData}></Modal>}
    </li>
  );
}
