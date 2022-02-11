import { Modal, Button, Stack} from "react-bootstrap"
import { useRef } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal({ budgetId, handleClose}) {
    const { getBudgetExpenses, budgets , deleteBudget, deleteExpense} = useBudgets()

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId 
        ? { name: "Uncategorizaded", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId)
    
    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
          
                <Modal.Header closeButton>
                    <Modal.Title> 
                        <Stack direction="horizontal" gap="2"> 
                            <div>Expenses - {budget?.name} </div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button 
                                    variant="outline-danger"
                                    onClick={() => { deleteBudget(budget)
                                        handleClose()
                                    }
                                    }                         
                                    >Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {expenses.map(expense => (
                    <Stack direction="horizontal" gap="2" key={expense.id}>
                       <div className="me-auto fs-10">
                       {expense.description} - <span class="font-weight-lighter">{expense.type}</span> - <span class="text-muted">{new Intl.DateTimeFormat( 'es-ar').format(expense.date)}</span></div>
                       <div className="fs-6">
                        {currencyFormatter.format(expense.amount)}
                        <Button size="sm" className="m-1" onClick={()=> deleteExpense(expense)} variant="outline-danger">&times;</Button>
                        </div>
                       
                    </Stack>
                ))}
       
                </Modal.Body>

        </Modal>
    )
}
