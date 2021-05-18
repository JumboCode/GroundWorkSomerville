import React, {useState} from 'react';
import './styles.css';
import { Modal, Button } from 'react-bootstrap';
import EditUnit from "./EditUnit";
import axios from 'axios';
 
const EditItem = ({show, onHide, id}) => {
    const [formData, setFormData] = useState({})
    const [image, setImage] = useState({})

    const submitData = () => {
        var form = new FormData();
        form.append('image', image);
        form.append('info', JSON.stringify({...formData, oldname:"Grapes", categories:"Vegetable"}))
        axios({
            method: "post",
            url: "update-produce",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
          
    }

    return (
        <Modal id="editModal" show={show} onHide={onHide} size="lg" scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                <EditUnit id={id} sendFormData={(dat)=>setFormData(dat)} sendImage={(dat)=>setImage(dat)}/>
            </Modal.Body>
            <Button className="float-right" onClick={submitData}>Save</Button>
        </Modal>
    )
}

export default EditItem;