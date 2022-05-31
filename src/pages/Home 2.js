// import React from "react";
// import { useState, useEffect } from "react";

// function Home() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editId, setEditId] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editId) {
//       const editTodo = todos.find((i) => i.id === editId);
//       const updatedTodos = todos.map((t) =>
//         t.id === editTodo.id
//           ? (t = { id: t.id, todo })
//           : { id: t.id, todo: t.todo }
//       );
//       setTodo(updatedTodos);
//       setEditId(0);
//       setTodo("");
//       return;
//     }

//     if (todo !== "")
//       setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
//     setTodo("");
//   };

//   const handleDelete = (id) => {
//     const deletedTodo = todos.filter((to) => to.id !== id);
//     setTodos([...deletedTodo]);
//   };

//   const handleEdit = (id) => {
//     const editedTodo = todos.find((i) => i.id === id);
//     setTodo(editedTodo.todo);
//     setEditId(id);
//   };

//   return (
//     <div className="main">
//       <h1>To do list App</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />
//         <button type="submit"> {editId ? "Edit" : "Go"}</button>
//         <ul>
//           {todos.map((t) => (
//             <li>
//               <span key={t.id}>{t.todo}</span>
//               <button onClick={() => handleEdit(t.id)}>Edit</button>
//               <button onClick={() => handleDelete(t.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </form>
//     </div>
//   );
// }

// export default Home;
