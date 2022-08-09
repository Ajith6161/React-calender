import { Modal, ModalBody, ModalHeader,Button } from "react-bootstrap"

const CancelPopUp = ({ show, handleHide ,handleCancel }) => {
    return (
        <Modal show={show} onHide={handleHide} >
            <ModalHeader closeButton >
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column align-items-center" >
                    <div className="mb-4" > 
                        <h4>Are You Sure Want To Cancle This ?</h4>
                    </div>
                    
                    <div className="d-flex w-100 justify-content-around" >
                        <div><Button variant="primary" onClick={handleCancel} >Ok</Button></div>
                        <div><Button onClick={handleHide} >Cancel</Button></div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}
export default CancelPopUp;