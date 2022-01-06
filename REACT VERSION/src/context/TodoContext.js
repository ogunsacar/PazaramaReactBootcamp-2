import { createContext, useReducer,  } from "react"

export const TodoContext = createContext()

const todoReducer = (state,action) => {
    switch(action.type){
        case 'DARK':
            return {...state, dark : action.payload};
        default : 
            return state 
    }
           
}

export default function TodoContextProvider({children}) {
    

    const [state, dispatch] = useReducer(todoReducer, {
        dark :true
    })
    
    

    return (
        <TodoContext.Provider value={{...state,dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}
