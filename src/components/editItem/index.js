import React from 'react';
import './styles.css';
import { Modal, Form, Button } from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog'
import inventoryData from "../../temp-data/inventoryData";
import EditUnit from "./EditUnit";
 
const EditItem = ({show, onHide, id}) => {

    const editData = inventoryData.map(data =>  {
        if (data.id === id) {
            return (
                <EditUnit key={data.id} item={data} />
            )
        }
    })
    return (
        <Modal id="editModal" show={show} onHide={onHide} size="lg" scrollable={true} centered>
        <Modal.Header closeButton>
            <Modal.Title as="h5">Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
            {editData}
        </Modal.Body>
        <Button className="float-right">Save</Button>

        </Modal>
    )
}

export default EditItem;