import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';
import del from './del.png';

const AddItem = ({update, token}) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})
    const [entrySucc, setEntrySucc] = useState({0:false})
    const [numEntries, setNumEntries] = useState([0])

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles({...files, [id]:{...files[id], [e.target.name]:e.target.files[0]}})
        } else {
            setEntries({...entries, [id]:{...entries[id], [e.target.name]:e.target.value}})
        }
    }

    const sendEntries = (e) => {
        e.preventDefault()
        const newSucc = []
        Object.keys(entries).forEach((key, i) => {
            if (entries[key] !== undefined){
                var form = new FormData();
                Object.entries(files[key]).forEach(([n, f]) => { form.append(n, f) });
                form.append('info', JSON.stringify(entries[key]))
                axios({
                    method: "post",
                    url: "add-merchandise",
                    data: form,
                    headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}` },
                })
                .then(function (response) {
                    console.log(response)
                    update(key+i)
                })
                .catch(function (response) {
                    console.log(response)
                });
                newSucc.push(true)
            }
        })
        setEntrySucc(newSucc)
    }

    const getValue = (id, dat) =>{
        const form = entries[id]
        if (form !== undefined ) {
            const val = form[dat]
            if (val !== undefined){
                return val
            }
        }
        return ''
    }

    const getFile = (id, dat) => {
        const fs = files[id]
        if (fs !== undefined) {
            const val = fs[dat]
            if (val !== undefined){
                return [val]
            }
        }
        return ''
    }

    const delItem = (id) => {
        if (numEntries.length > 1){
            const newEntries = Object.assign({}, entries, {[id]: undefined})
            setEntries(newEntries)
            numEntries.splice(numEntries.indexOf(id), 1)
            setNumEntries(numEntries)
        }
    }

    const addNewItem = () => {
        const finalEntry = numEntries[numEntries.length - 1] + 1
        const newEntries = numEntries.concat([finalEntry])
        setNumEntries(newEntries)
        setEntrySucc(newEntries.map(() => {return false}))
    }

    const entry = (id, i) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <Form key={"merch-entry-"+id} className="add-merch-entry" as="div">
            <Row>
                <Col sm={5}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col><Form.Control name="name" onChange={onChng} required value={getValue(id, "name")}/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Available</Form.Label>
                        <Col><Form.Control type="number" name="quantity" min={0} onChange={onChng} value={getValue(id, "quantity")} required/></Col>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Price</Form.Label>
                        <Col><Form.Control name="price" type="number" step="0.01" min="0" onChange={onChng} value={getValue(id, "price")} required/></Col>
                    </Form.Group>
                </Col>
                <Col xs={1}><img src={del} className="addItemDel" onClick={() => delItem(id)} alt="delete"/></Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Category</Form.Label>
                        {/* <Col><Form.Control type="number" name="category" onChange={onChng} value={getValue(id, "category")} required/></Col> */}
                        <Col><select name="category" onChange={onChng} required defaultValue="" className="add-merch-drop" value={getValue(id, "category")}>
                            <option value='' disabled hidden>Select one</option>
                            <option value={1}>Apparel</option>
                            <option value={2}>Sticker</option>
                            <option value={3}>Others</option>
                        </select></Col>
                    </Form.Group>
                </Col>
                <Col sm={8}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Description</Form.Label>
                        <Col><Form.Control name="description" as="textarea" onChange={onChng} value={getValue(id, "description")} required/></Col>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm={1}>Images</Form.Label>
                <Col> <Form.File className="custom-file" required name="photo1" onChange={onChng} files={getFile(id, "photo1")}/> </Col>
                <Col> <Form.File className="custom-file" required name="photo2" onChange={onChng} files={getFile(id, "photo2")}/> </Col>
                <Col> <Form.File className="custom-file" required name="photo3" onChange={onChng} files={getFile(id, "photo3")}/> </Col>
            </Form.Group>
            {entrySucc[i] && <div className="text-success ml-2">Successfully added entry</div>}
            {i !== numEntries.length-1 && <hr/>}
            </Form>
        )
    }

    return (
        <div>
            <Form onSubmit={sendEntries}>
                {numEntries.map(entry)}
                <Button className="add-merch-button">Save all</Button>
            </Form>
            <div className="add-item-button"><Button onClick={addNewItem}> Add New Entry </Button></div>
        </div>
    )
}

export default AddItem;