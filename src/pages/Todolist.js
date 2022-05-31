import axios from "axios";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

const backgroundPicture = new URL(
  "../assets/pictures/horloges2.jpeg",
  import.meta.url
);

//COMPOSANTS
import Header from "../components/Header";

function Todolist() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get/all/tasks`);
        setTasks(response.data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [refresh]);

  const addNewTask = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/create/task`, {
        title: input,
      });
    } catch (error) {
      console.log(error.response);
    }
    setInput("");
    setRefresh(refresh + 1);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3001/delete/task`, {
        id: id,
      });
      setRefresh(refresh + 1);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3001/update`, {
        id: id,
        title: input,
      });
      setRefresh(refresh + 1);
      setInput("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCheckbox = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/update/checkbox`,
        {
          id: id,
          isDone: true,
        }
      );
      setRefresh(refresh + 1);
      setInput("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container-todolist">
        <section className="section-todolist">
          <div className="typewriter">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("TIC TAC TIC TAC")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("WRITE BEFORE TO FORGET")
                  .start();
              }}
            />
          </div>

          <form onSubmit={addNewTask}>
            <div className="formAddTask">
              <input
                className="input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <br />
              <input className="buttonAddTask" type="submit" value="Add task" />
            </div>
          </form>

          {tasks.map((task, index) => {
            // console.log(task.isDone);
            return (
              <div key={index}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => {
                    handleCheckbox(task._id);
                  }}
                />

                <span
                  className="taskTitle"
                  style={{ textDecoration: task.isDone && "line-through" }}
                >
                  {task.title}
                </span>

                <button
                  className="buttonDelete"
                  onClick={() => {
                    handleDelete(task._id);
                  }}
                >
                  Delete
                </button>

                <button
                  className="buttonEdit"
                  onClick={() => {
                    handleEdit(task._id);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Todolist;
