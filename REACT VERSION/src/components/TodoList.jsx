import axios from "axios";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import useTodoMethods from "../hooks/useTodoMethods";

export default function TodoList() {
  const url = `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`;

  const [todos, setTodos] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);

  const { deleteTodo, putTodo } = useTodoMethods();

  useEffect(() => {
    axios.get(url).then((res) => setTodos(res.data));
  }, []);

  const handleComplete = (todo, id) => {
    setIsPending(true);
    putTodo(url, "PUT", { ...todo, isCompleted: true }, id).then(() => {
      setIsPending(false);
      window.location.reload();
    });
  };

  const handleDelete = (id) => {
    setIsPending(true);
    deleteTodo(url, "DELETE", id).then(() => {
      setIsPending(false);
      window.location.reload();
    });
  };

 /*  const handleEdit = (id) => {
    setIsPending(true);
    axios.put(url + id,{content :editInput}).then(() => {
      setIsPending(false);
    });
  }; */

  return (
    <>
      {/* {editDisplay && (
        <form className="edit-form">
          <label>
            <span>Edit todo</span>
            <input value type="text" />
          </label>
          <button>Edit</button>
        </form>
      )} */}

      <ul className="todo-list">
        {isPending && <h2>Loading...</h2>}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <h3 className={todo.isCompleted ? "completed" : ""}>
              {todo.content}
            </h3>
            <button onClick={() => handleDelete(todo.id)}>REMOVE</button>
            <button onClick={() => handleComplete(todo, todo.id)}>
              MARK AS COMPLETE
            </button>
            
            <span onClick={()=>{
              setEditDisplay(prev => !prev)
            /*   handleEdit(todo.id) */
            }
            } className="edit-icon">
              {<BsPencilSquare />}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
