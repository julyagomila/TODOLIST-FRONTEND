// import axios from "axios";
import { useState } from "react";

function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addNewTask = (event) => {
    event.preventDefault();
    console.log(input);
    const newTasks = [...tasks];
    newTasks.push({ title: input, isDone: false });
    setTasks(newTasks);
    setInput("");
  };

  const handleCheckbox = (index) => {
    console.log("Index à modifier =>", index);
    const newTasks = [...tasks];
    newTasks[index].isDone = !newTasks[index].isDone; //soit true / false
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    // console.log("Delete =>", index);
    console.log(tasks);
    const newTasks = [...tasks];
    //Je vais voir supprimer la tâche à l'index reçu du tableau tasks
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div>
        {tasks.map((task, index) => {
          // console.log(task.isDone);
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => {
                  handleCheckbox(index);
                }}
              />
              <span> {task.title}</span>
              <button
                className="buttonX"
                onClick={() => {
                  handleDelete(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <form onSubmit={addNewTask}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <input type="submit" value="Add task" />
      </form>
    </div>
  );
}

export default Home;
