import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

const AddHarvest = ({token, show}) => {
    const [entries, setEntries] = useState({})
    const [entrySucc, setEntrySucc] = useState(false)
    const [produce, setProduce] = useState([])

    useEffect(() => {
        if (show){
            axios.get("produce-names")
            .then((resp) => {
                setProduce(resp.data)
            })
        }
    }, [show])

    const onChng = (e) => {
        setEntries({...entries, [e.target.name]:e.target.value})
    }

    const sendEntries = (e) => {
        e.preventDefault()
        console.log(token)
        var form = new FormData();
        form.append('info', JSON.stringify(entries))
        axios({
            method: "post",
            url: "add-harvest",
            data: form,
            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}`},
            })
        .then(function (response) {
            console.log(response);
            setEntrySucc(true)
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    const getProduce = (item) => {
        return(<option value={item} key={item}>{item}</option>)
    }

    return (
        <div>
            <Form className="add-produce-entry" onSubmit={sendEntries}>
                <Row>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label column sm={1}>Name</Form.Label>
                            <Col><select name="name" onChange={onChng} required defaultValue={""} className="add-harvest-drop">
                                <option value="" disabled hidden>Select a produce</option>
                                {produce.map(getProduce)}
                            </select></Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Quantity</Form.Label>
                            <Col><Form.Control type="number" name="quantity" onChange={onChng} required/></Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Weight</Form.Label>
                            <Col><Form.Control name="weight" type="number" onChange={onChng} required/></Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="add-produce-button">Save</Button>
            </Form>
            {entrySucc && <div className="text-success ml-2">Successfully added entry</div>}
        </div>
    )
}

export default AddHarvest;