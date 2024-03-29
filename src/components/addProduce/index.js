import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

const AddProduce = ({token, update}) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})
    const [entrySucc, setEntrySucc] = useState(false)
    const [numEntries, setNumEntries] = useState(1)

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles({...files, [id]:{...files[id], [e.target.name]:e.target.files[0]}})
        } else {
            setEntries({...entries, [id]:{...entries[id], [e.target.name]:e.target.value}})
        }
    }

    const sendEntries = (e) => {
        e.preventDefault()
        Object.keys(entries).forEach((key) => {
            var form = new FormData();
            Object.entries(files[key]).forEach(([n, f]) => { form.append(n, f) });
            form.append('info', JSON.stringify(entries[key]))
            axios({
                method: "post",
                url: "add-produce",
                data: form,
                headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}`},
              })
            .then(function (response) {
                setEntrySucc(true);
                update("produce" + key)
            })
            .catch(function (response) {
                console.log(response);
            });
        })
    }
    
    const entry = (id) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <Form key={"produce-entry-"+id} className="add-produce-entry" as="div">
            <Row>
                <Col sm={7}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col><Form.Control name="name" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Unit</Form.Label>
                        <Col><Form.Control name="unit" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Price</Form.Label>
                        <Col><Form.Control name="price" type="number" step="0.01" min="0" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Category</Form.Label>
                        {/* <Col><Form.Control type="number" name="category" onChange={onChng} required/></Col> */}
                        <Col><select name="category" onChange={onChng} required defaultValue="" className="add-produce-drop">
                            <option value='' disabled hidden>Select one</option>
                            <option value={1}>Fruit</option>
                            <option value={2}>Vegetable</option>
                            <option value={3}>Herb</option>
                            <option value={4}>Pepper</option>
                            <option value={5}>Others</option>
                        </select></Col>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm={1}>Image</Form.Label>
                <Col> <Form.File className="custom-file" required name="photo" onChange={onChng}/> </Col>
            </Form.Group>
            {id !== numEntries-1 && <hr/>}
            </Form>
        )
    }

    return (
        <div>
            <Form onSubmit={sendEntries}>
                {[...Array(numEntries).keys()].map(entry)}
                <Button className="add-produce-button" type="Submit">Save</Button>
            </Form>
            {entrySucc && <div className="text-success ml-2">Successfully added entry</div>}
        </div>
    )
}

export default AddProduce;
