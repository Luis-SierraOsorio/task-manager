import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
function App() {
  const [tasks, setTasks] = useState(null);

  async function getData(){
    try {
      const userEmail = 'luis@test.com';
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json()
      // console.log(json)
      setTasks(json);
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(()=>{
    
    getData();
  },[]);
  
  console.log(tasks)

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return <div className="app">
  <ListHeader listName={"Holiday Tick List"} getData={getData}></ListHeader>
  {sortedTasks?.map((task) => <ListItem  getData={getData} key={task.id} task={task}/>)}
  </div>;
}

export default App;
