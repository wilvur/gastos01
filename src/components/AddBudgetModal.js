import {Form , Modal, Button} from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetContext"

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const creditRef = useRef()

    const {addBudget} = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
            credit: creditRef.current.checked,
          })
        handleClose()
    } 
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit= {handleSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title> Nueva Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group  className="mb-3" controlId="name">
                        <Form.Label> Nombre</Form.Label>
                        <Form.Control ref={nameRef} type="text"  required/> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximo Gasto</Form.Label>
                        <Form.Control ref={maxRef}  type="number" required min={0} step={0.01} /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="credito">       
                    <Form.Label className="form-check-label">Credito</Form.Label>
                    <Form.Control className="form-check-input" ref={creditRef}  type="checkbox" /> 
                  
               
                </Form.Group>
                </Modal.Body>
                <div className="d-flex justify-content-end m-3">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Form>
        </Modal>
    )
}
