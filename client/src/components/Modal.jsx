import { useState } from "react";

export default function Modal({ mode, setShowModal, task, getData }) {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "luis@test.com",
    title: editMode ? task.title : "test",
    progress: editMode ? task.progress : 50,
    date: editMode ? "" : new Date(),
  });

  function handleChange(e) {
    console.log(data);

    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function postData(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if(response.status === 200){
        console.log('It Worked')
        setShowModal(false);
        getData();
      }
    //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
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
          <input
            className={mode}
            type="submit"
            name=""
            id=""
            onClick={editMode ? "" : postData}
          />
        </form>
      </div>
    </div>
  );
}
