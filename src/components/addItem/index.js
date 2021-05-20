import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

const AddItem = (props) => {
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
                url: "add-merchandise",
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
              })
            .then(function (response) {
                console.log(response);
                setEntrySucc(true)
            })
            .catch(function (response) {
                console.log(response);
            });

        })
    }

    const entry = (id) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            // <div className="add-merch-entry" key={"merch-entry-"+id}>
            //     <div>
            //         <label>Name:</label>
            //         <input type="text" onChange={onChng} name="name"/>
            //         <label>Price:</label>
            //         <input type="number" onChange={onChng} name="price"/>
            //     </div>
            //     <div>
            //         <label>Description</label>
            //         <input type="text" onChange={onChng} name="description"/>
            //     </div>
            //     <label>Available:</label>
            //     <input type="number" onChange={onChng} name="quantity"/>
            //     <label>Category:</label>
            //     <input type="text" onChange={onChng} name="category"/>
            //     <label>Photos:</label>
            //     <div>
            //         <input type="file" onChange={onChng} name="photo1"/>
            //         <input type="file" onChange={onChng} name="photo2"/>
            //         <input type="file" onChange={onChng} name="photo3"/>
            //     </div>
            // </div>
            <Form key={"produce-entry-"+id} className="add-merch-entry" as="div">
            <Row>
                <Col sm={5}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col><Form.Control name="name" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Available</Form.Label>
                        <Col><Form.Control name="quantity" min={0} onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Price</Form.Label>
                        <Col><Form.Control name="price" type="number" step="0.01" min="0" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Category</Form.Label>
                        <Col><Form.Control type="number" name="category" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>
                <Col sm={8}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Description</Form.Label>
                        <Col><Form.Control name="description" as="textarea" onChange={onChng} required/></Col>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm={1}>Image</Form.Label>
                <Col> <Form.File className="custom-file" required name="photo1" onChange={onChng}/> </Col>
                <Col> <Form.File className="custom-file" required name="photo2" onChange={onChng}/> </Col>
                <Col> <Form.File className="custom-file" required name="photo3" onChange={onChng}/> </Col>
            </Form.Group>
            {id !== numEntries-1 && <hr/>}
            </Form>

        )
    }

    return (
        <div>
            <Form onSubmit={sendEntries}>
                {[...Array(numEntries).keys()].map(entry)}
                {/* <Form.Control.Feedback type="valid">The given entry is saved</Form.Control.Feedback> */}
                <Button className="add-merch-button">Save</Button>
            </Form>
            {entrySucc && <div class="text-success ml-2">Successfully added entry</div>}

            {/* <Button onClick={() => setNumEntries(numEntries + 1)}> Add A New Item </Button> */}
        </div>
    )
}

export default AddItem;


