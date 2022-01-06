import { useState } from "react"


const useTodoMethods = () => {
    const[isPending,setIsPending] = useState(false)
    const [error, setError]  = useState('')

    const getTodo = async(url) => {
        setIsPending(true)
        const res = await fetch(url);
        
        const data = await res.json()

        setIsPending(false)

        return {data ,isPending,error};
    }
        const postTodo = async(url,method='POST',body) => {
        const res = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if(res.status !== 200){
            setError('Something went wrong! Please try again!')
          }
          const data = await res.json();
          setIsPending(false)
          return {data ,isPending,error};
    }
    
    const putTodo = async(url,method='PUT',body,id) => {
        const res = await fetch(`${url}${id}`, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if(res.status !== 200){
            setError('Something went wrong! Please try again!')
          }
          const data = await res.json();
          setIsPending(false)
          return {data ,isPending,error};
    }
    
    const deleteTodo = async(url,method='PUT',id) => {
        const res = await fetch(`${url}${id}`, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          });
          if(res.status !== 200){
            setError('Something went wrong! Please try again!')
          }
          const data = await res.json();
          setIsPending(false)
          return {data ,isPending,error};
    }

    return{getTodo, postTodo, putTodo,deleteTodo}

}

export default useTodoMethods