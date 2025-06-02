import { useContext, createContext, useState, useEffect } from "react"
import axios from "axios"
const ExpenseContext=createContext(); 
export const ExpenseProvider=({children})=>{
    const [expenses,setexpenses]=useState([]); 
    const fetchexpenses=async()=>
    {
        try
        {
            const apiresp=await axios.get("http://localhost:9000/api/fetchallexpenses")
            setexpenses(apiresp.data.data); 
        }
        catch(e)
        {
            console.log("Error fetching expenses: "+e.message)
        }
    }; 
    useEffect(()=>
    {
        fetchexpenses(); 
    },[]); 
    return(
        <ExpenseContext.Provider value={{expenses, fetchexpenses}}>
            {children}
        </ExpenseContext.Provider>
    )
}
export const useExpenses=()=>useContext(ExpenseContext)