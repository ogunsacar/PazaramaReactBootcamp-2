import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoContext } from "./context/TodoContext";

function App() {
  const [isDark,setIsDark] = useState(true)
  const { dark, dispatch } = useContext(TodoContext);

  const changeTheme = () => {
    dispatch({ type: "DARK", payload: !isDark });
  };

  return (
    <div style={{ filter: dark ? "invert(0)" : "invert(100%)" }} className="app">
      <button onClick={()=> {
        setIsDark(prev => !prev)
        changeTheme()}} className='change-theme'>CHANGE THEME</button>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
