import {Form , Modal, Button} from "react-bootstrap"
import { useRef, useState } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext"

export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const typeRef = useRef()
    const cuotasRef = useRef()


    const {addExpenses, budgets, expenses} = useBudgets()

    const  budgetDefault = budgets.filter(budget => budget.id === defaultBudgetId)

    const typeList = []
    expenses.map(element => { typeList.push(element.type)})  
    const typeListFilter = [... new Set(typeList)]

 
    function handleSubmit(e) {
        e.preventDefault()

        const amount = parseFloat(amountRef.current.value)
        const description = descriptionRef.current.value

        addExpenses({
            description : description,
            amount : amount,
            budgetId : budgetIdRef.current.value,
            type: typeRef.current.value,
        } ) 

        handleClose()
    } 
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit= {handleSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title> Nuevo Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group  className="mb-3">
                        <Form.Label> Descripcion</Form.Label>
                        <Form.Control ref={descriptionRef} type="text"  required/> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Monto</Form.Label>
                        <Form.Control ref={amountRef}  type="number" required min={0} step={0.01} /> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Categoria</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                        <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorizaded</option>     
                        { budgets.map( budget => 
                                (
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                )
                        )}
                        </Form.Select> 
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label> Type</Form.Label>
                <Form.Control ref={typeRef}  type="text" list="types" /> 
                    <datalist id="types">
                    {typeListFilter.map(type => (
                        <option key={type } value={type}>{type}</option>
                    ))
                    }
                    </datalist>
                    </Form.Group> 
                        <Form.Group className="mb-3">
                        <Form.Label>Cuotas </Form.Label>
                        <Form.Control ref={cuotasRef}  type="number" min={1} max={24} step={1} placeholder="1" /> 
                    </Form.Group>
        
            </Modal.Body>
                <div className="d-flex justify-content-end m-3">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Form>
        </Modal>
    )
}
