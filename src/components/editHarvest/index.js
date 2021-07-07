import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col, Button as BButton} from 'react-bootstrap';

const EditHarvest = ({id, update, token, hide}) => {
    const [entries, setEntries] = useState({})
    const [entrySucc, setEntrySucc] = useState(false)

    useEffect(()=>{
        axios.get('harvest-detail/' + id, {headers: {'Authorization': `Token ${token}`}})
        .then((resp) => {
            setEntries(resp.data)
        })
    }, [id])


    const handleInputChange = (e) => {
        setEntries({...entries, [e.target.name]:e.target.value})
    }

    const submitData = (e) => {
        e.preventDefault()
        var form = new FormData();
        form.append('newData', JSON.stringify({...entries, id: String(id)}))
        axios({
            method: "post",
            url: "update-harvest",
            data: form,
            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}`},
        })
        .then(function (resp) {
            setEntrySucc(true)
            update("harvest-update" + id)
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    const deleteItem = () => {
        axios({
            method: "post",
            url: "delete-harvest/" + id,
            headers: {'Authorization': `Token ${token}`}
        })
        .then(function (resp) {
            update("harvest-delete" + id)
            hide()
        })
        .catch(function (response) {
            console.log(response);
        });

    }

    const getValue = (id, dat) =>{
        const val = entries[dat]
        if (val !== undefined){
            return val
        }
        return ''
    }

    const entry = (id) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <Form key={"merch-entry-"+id} className="add-merch-entry" onSubmit={submitData}>
            <Row>
                <Col sm={10}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Name: </Form.Label>
                        {/* <Form.Label column bold></Form.Label> */}
                        <Form.Label column className="font-weight-bold">{entries.name}</Form.Label>
                    </Form.Group>
                </Col>
                <Col>
                    <BButton variant="danger" onClick={deleteItem}>Delete</BButton>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Quantity</Form.Label>
                        <Col><Form.Control name="quantity" type="number" step="0.01" min="0" onChange={onChng} value={getValue(id, "quantity")} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Weight</Form.Label>
                        <Col><Form.Control type="number" name="weight" step="0.01" min="0" onChange={onChng} value={getValue(id, "weight")} required/></Col>
                    </Form.Group>
                </Col>
            </Row>


            {entrySucc && <div className="text-success ml-2">Successfully edited entry</div>}
            <Button className="add-merch-button">Save edits</Button>
            </Form>
        )
    }

    return (
        <div>
            {entry(0)}
        </div>
    )
}

export default EditHarvest;