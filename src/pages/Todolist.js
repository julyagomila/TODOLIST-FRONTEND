import axios from "axios";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { Link, Navigate, useNavigate } from "react-router-dom";

const backgroundPicture = new URL(
  "../assets/pictures/horloges2.jpeg",
  import.meta.url
);

//COMPOSANTS
import Header from "../components/Header";

function Todolist({ token }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/get/all/tasks`,

          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
        // console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [refresh]);

  const addNewTask = async (event) => {
    event.preventDefault();
    const newTask = new FormData();
    newTask.append("title", input);

    try {
      const response = await axios.post(
        `http://localhost:3001/create/task`,
        newTask,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
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
      console.log(error.response.data);
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
        }
      );
      setRefresh(refresh + 1);
      setInput("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="App">
      <Link to={"/"}>
        <Header />
      </Link>
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
        <Link to={"/login"}>
          <span className="logout">Logout</span>
        </Link>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Todolist;
