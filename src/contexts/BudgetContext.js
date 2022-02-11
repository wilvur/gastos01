import React, {useContext} from 'react'
import {v4 as uuidV4 } from 'uuid'
import useLocaStorage from '../hooks/uselocalStorage'
const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorizaded"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({children}) => {
    const [budgets, setBugets] = useLocaStorage("budgets", [])
    const [expenses, setExpenses] = useLocaStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return  expenses.filter(expense => expense.budgetId === budgetId)
      }

    function addExpenses( {description, amount, budgetId, type}) {
        const date = Date.now()
        setExpenses(prevExpenses=> {
            return [...prevExpenses, {id: uuidV4() , description, amount, budgetId , date, type} ]
        })
    }
    function addBudget({name, max, credit}) {

           setBugets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            } 
            return [...prevBudgets, {id: uuidV4() , name, max , credit}]
            })
     }
    
    function deleteBudget({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setBugets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>

    )
}