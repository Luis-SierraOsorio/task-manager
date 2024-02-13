import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Modal({ mode, setShowModal, task, getData }) {
  // this is a variable to show the modal in edit mode, the mode is passed through as a parameter
  const editMode = mode === "edit" ? true : false;
  // state for the cookies
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // setting the state for the editing contents, either gets info from the task if in editing mode or set default values
  const [data, setData] = useState({
    // grabs email from the tasks returned through the params or from the cookies
    user_email: editMode ? task.user_email : cookies.Email,
    // gets title from the task or sets it to null
    title: editMode ? task.title : "",
    // gets the task progression from the task or the sets it to 50
    progress: editMode ? task.progress : 50,
    // gets the date from the task or sets a new one
    date: editMode ? task.date : new Date(),
  });

  // function for editing a task
  async function editData(e) {
    e.preventDefault();
    try {
      // gets the specific task information form the backend using task id, sets method as put, headers and body as json
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // if the response is good then we go ahead and close the modal and refetch the new data
      if (response.status === 200) {
        // closes modal, this is passed in the params from wherever this is called
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to handle changes of the task being editted, handles the changes to title and progression
  function handleChange(e) {
    // destructing new values and name of the input being changed
    const { name, value } = e.target;
    // spreading the data back in and only changing the value passed in
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // function to post data on the database, this funciton gets called if the modal called form the listheader
  async function postData(e) {
    e.preventDefault();
    try {
      //this is for posting new info onto the database
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // if requrest goes through then we close the modal, and refetch the data
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          {/* displaying the mode we are in */}
          <h3>{mode} task</h3>
          {/* button to close the modal, function is passed through params from wherever it is called */}
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        {/* form to handle editting or making a newe todo task */}
        <form action="">
          {/* input for the task title */}
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={data.title}
            placeholder="task title"
            required
            maxLength={30}
          />
          {/* label for the progression bar */}
          <label htmlFor="range">Select Current Progress</label>
          {/* input for the progression bar */}
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
          {/* input for the submit button */}
          <input
            className={mode}
            type="submit"
            // what the click does depends on where the modal is called in, either editing or posting function gets called
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
}
