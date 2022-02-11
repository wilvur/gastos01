import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {
 const { expenses, budgets } = useBudgets()
 const amount = expenses.reduce((total, expense) => total + expense.amount, 0 )

 const max =  budgets.reduce((total, budget) => total + budget.max, 0 )
 
  if (max === 0) return null
  
  return (
      <BudgetCard show={true} amount={amount} name="Total" max={max} gray hideButtons />
  )
}