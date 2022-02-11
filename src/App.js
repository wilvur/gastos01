import { Container, Button, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard"
import LastExpensesBudgetCard from "./components/LastExpensesBudgetCard";
import BudgetCard from "./components/BudgetCard";
import {useState} from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContext";

function App() {
    const [showAddBudgetModal , setShowAddBudgetModal] = useState(false) 
    const [showAddExpenseModal , setShowAddExpenseModal] = useState(false) 
    const [viewExpensesModalBudgetId , setViewExpensesModalBudgetId ] = useState() 
    const [addExpenseModalBudgetId , setAddExpenseModalBudgetId] = useState() 
    const {budgets, getBudgetExpenses} = useBudgets()

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true) 
        setAddExpenseModalBudgetId(budgetId)
    }
    
    return  (
    <>
    <Container className="my-4"> 
        <Stack direction="horizontal" gap="2" className="mb-4">
            <h1 className="me-auto"> Control de gastos</h1>
            <Button variant="primary"         onClick={() => setShowAddBudgetModal(true)}>Budget</Button>
            <Button variant="outline-primary" onClick={() => setShowAddExpenseModal(true)}>Add Expense</Button>
        </Stack>    
        <div 
            style={{display:"grid", 
            gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", 
            gap:"1rem" , 
            alignItems:"flex-start", marginBottom: "1rem"
            }} 
        >
            {budgets.map(budget => {
             const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0 )
             
             return (
                <BudgetCard  
                    key= {budget.id}
                    name= {budget.name}
                    amount={amount} 
                    max={budget.max} 
                    onAddExpenseClick = {() => openAddExpenseModal(budget.id)} 
                    onViewExpensesClick = {() => setViewExpensesModalBudgetId(budget.id)} 
                    credit = {budget.credit}
                />
             )         
             })}

        </div>
  
     <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={()=>setShowAddBudgetModal(false)}
    />
    <AddExpenseModal  
        show={showAddExpenseModal}  
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={()=>setShowAddExpenseModal(false)} 
    />
     <UncategorizedBudgetCard  
        onAddExpenseClick = {openAddExpenseModal}
        onViewExpensesClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
     />
     <ViewExpensesModal
      budgetId = {viewExpensesModalBudgetId}
      handleClose={()=>setViewExpensesModalBudgetId()} 
      />
     <TotalBudgetCard />

     <LastExpensesBudgetCard />
     </Container>
  
     </>
     );
    
}

export default App