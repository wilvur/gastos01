import { useBudgets } from "../contexts/BudgetContext";
import {dateFomatter} from "../utils"

export default function LastExpensesBudgetCard() {
    const { expenses } = useBudgets()
 
     const rowsEven = document.getElementById("rows") 

    // rowsEven.classList.add("bg-primary")

    let lastExpenses =  [...expenses].sort(
        function (a,b){
         if( a.date < b.date) {
           return 1
         } else {
           return -1
         }
        }
     ).slice(0, 10)

  return (
            <div id="rows" className="card p-3">
                {lastExpenses.map(expense => (
                <div className="d-flex flex-row gap-4"> 
                <div className="flex-grow-">{dateFomatter.format(expense.date)}</div>
                <div className="flex-grow-1 pl-5"> {expense.description}</div>
                <div className="flex-grow-0 flex-content-end">{expense.amount}</div>
                </div> 
                )
                )}
            </div>
 
  )
}
