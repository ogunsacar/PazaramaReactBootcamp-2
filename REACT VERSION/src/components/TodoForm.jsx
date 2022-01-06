import axios from "axios";
import { useState } from "react";
import useTodoMethods from "../hooks/useTodoMethods";

export default function FeedbackForm() {
  const [todo, setTodo] = useState('');
  const [username, setUsername] = useState("");
  const [isPending, setIsPending] = useState(false);
  const url = `https://61c37acc9cfb8f0017a3ebb5.mockapi.io/todos/`


  localStorage.setItem('username', username)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true)
    
    axios.post(url,{
      content: todo
    }).then(() =>{
      setIsPending(false)
      window.location.reload();
    }
    );
    
  };

  const handleChange = (e) => {
      e.preventDefault()
      setUsername(e.target.value)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>TODO APP</h2>
      <div className="userName">
        <label>
          <span>Username: </span>
          <input type="text"
          value={username}
          onChange={handleChange} />
        </label>
      </div>
      <h4>Welcome, {username}</h4>
      <label>
        <span>Add TODO:</span>
        <input
          type="text"
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className='inputForm'
        />
      </label>
      <button>Submit</button>
      {isPending && <h2>Loading...</h2>}
    </form>
  );
}
