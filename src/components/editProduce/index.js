import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';
import {Button as BButton} from 'react-bootstrap'

const EditProduce = ({id, update, token, hide}) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})
    const [oldFiles, setOldFiles] = useState([])
    const [entrySucc, setEntrySucc] = useState(false)

    useEffect(()=>{
        axios.get('produce-detail/' + id, {headers: {'Authorization': `Token ${token}`}})
        .then((resp) => {
            const {photo_url, ...entry} = resp.data
            setEntries(entry)
            setOldFiles(photo_url)
        })
    }, [id])

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles(e.target.files[0])
        } else {
            setEntries({...entries, [e.target.name]:e.target.value})
        }
    }

    const submitData = (e) => {
        e.preventDefault()
        var form = new FormData();
        form.append("photo", files)
        form.append('newData', JSON.stringify(entries))
        axios({
            method: "post",
            url: "update-produce",
            data: form,
            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}`},
        })
        .then(function (resp) {
            console.log(resp.data)
            setOldFiles(resp.data)
            setEntrySucc(true)
            update("produce-update" + id)
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

    const getFile = (id, dat) => {
        const val = files[dat]
        if (val !== undefined){
            return ''
        }
        return ''
    }

    const deleteItem = () => {
        axios({
            method: "post",
            url: "delete-produce/" + id,
            headers: {'Authorization': `Token ${token}`}
        })
        .then(function (resp) {
            update("produce-delete" + id)
            hide()
        })
        .catch(function (response) {
            console.log(response);
        });

    }

    const entry = (id, i) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <Form key={"merch-entry-"+id} className="add-merch-entry" onSubmit={submitData}>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Name</Form.Label>
                        <Col><Form.Control name="name" onChange={onChng} required value={getValue(id, "name")}/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Unit</Form.Label>
                        <Col><Form.Control name="unit" min={0} onChange={onChng} value={getValue(id, "unit")} required/></Col>
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Price</Form.Label>
                        <Col><Form.Control name="price" type="number" step="0.01" min="0" onChange={onChng} value={getValue(id, "price")} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>Category</Form.Label>
                        {/* <Col><Form.Control type="number" name="category" onChange={onChng} value={getValue(id, "category")} required/></Col> */}
                        <Col><select name="category" onChange={onChng} required value={getValue(id, "category")} className="add-produce-drop">
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
            <Row>
                <Form.Label column sm={2}>Old Image</Form.Label>
                <Col sm={3}><img src={oldFiles} className="edit-old-photo-p" alt="det"/></Col>
                <Col sm={5}>
                    <Form.Group>
                        <Form.Label>New Image</Form.Label>
                        <Form.File className="custom-file" name="photo" onChange={onChng}/>
                    </Form.Group>
                </Col>
                <Col>
                    <BButton variant="danger" onClick={deleteItem}>Delete</BButton>
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

export default EditProduce;