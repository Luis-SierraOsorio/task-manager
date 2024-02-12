import { useState } from "react";

export default function Modal({mode, setShowModal, task}) {
    const editMode = mode === "edit" ? true : false;
    const [data, setData] = useState({
        user_email: editMode ? task.user_email:null,
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : 50,
        data: editMode ? "" : new Date(),
    })
  function handleChange(e) {
    console.log(data);

    const {name, value} = e.target;
    setData(data => ({
        ...data,
        [name]: value
    }))
  }


  function postData(){
    try {
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>

        <form action="">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={data.title}
            id=""
            placeholder="task title"
            required
            maxLength={30}
          />
          <label htmlFor="range">Select Current Progress</label>
          <input
            type="range"
            name="progress"
            value={data.progress}
            id="range"
            required
            min="0"
            max="100"
            onChange={handleChange}
          />
          <input className={mode} type="submit" name="" id="" />
        </form>
      </div>
    </div>
  );
}
