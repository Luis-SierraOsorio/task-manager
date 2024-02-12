import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import {useCookies} from 'react-cookie'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken;

  async function getData() {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      // console.log(json)
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(tasks);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth></Auth>}
      {authToken && (
        <>
          <ListHeader
            listName={"Holiday Tick List"}
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
