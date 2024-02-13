import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  // useCookies to get from the window
  const [cookies, setCookie, removeCookie] = useCookies(null);
  // useState to keep track of the tasks
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  // this method fetches data from the backend
  async function getData() {
    try {
      // this fetches data with a dynamic userEmail
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      // parsing data
      const json = await response.json();
      // setting the tasks to the state
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect to get the data, only happens when the user is authenticated
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  // sorting task by dates
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {/* window being displayed when the user is not authenticated */}
      {/* sign up / log in page */}
      {!authToken && <Auth></Auth>}
      {/* user is authenticated */}
      {/* if the user is authenticated then we display the data of the user */}
      {authToken && (
        <>
        {/* list header that shows todo list title, add button and delete button*/}
          <ListHeader
            listName={"Your Todo List"}
            getData={getData}
          ></ListHeader>

          {sortedTasks?.map((task) => (
            <ListItem getData={getData} key={task.id} task={task} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
