import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

const EditItem = ({id, update, token}) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})
    const [oldFiles, setOldFiles] = useState([])
    const [entrySucc, setEntrySucc] = useState(false)

    useEffect(()=>{
        axios.get('merch-detail-inv/' + id, {headers: {'Authorization': `Token ${token}`}})
        .then((resp) => {
            const {photo_urls, ...entry} = resp.data
            setEntries(entry)
            setOldFiles(photo_urls)
        })
    }, [id])

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles({...files, [e.target.name]:e.target.files[0]})
        } else {
            setEntries({...entries, [e.target.name]:e.target.value})
        }
    }

    const submitData = (e) => {
        e.preventDefault()
        var form = new FormData();
        Object.entries(files).forEach(([n, f]) => { form.append(n, f) });
        form.append('newData', JSON.stringify(entries))
        axios({
            method: "post",
            url: "update-merchandise",
            data: form,
            headers: { "Content-Type": "multipart/form-data", 'Authorization': `Token ${token}`},
        })
        .then(function (resp) {
            setOldFiles(resp.data)
            setEntrySucc(true)
            update("merch-update" + id)
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

    const entry = (id, i) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <Form key={"merch-entry-"+id} className="add-merch-entry" onSubmit={submitData}>
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
            </Row>
            <Row>
                <Col>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Category</Form.Label>
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
            <Row>
                <Form.Label column sm={2}>Old Images</Form.Label>
                <Col><img src={oldFiles[0]} className="edit-old-photo" alt="det"/></Col>
                <Col><img src={oldFiles[1]} className="edit-old-photo" alt="det"/></Col>
                <Col><img src={oldFiles[2]} className="edit-old-photo" alt="det"/></Col>
            </Row>
            <Form.Group as={Row}>
                <Form.Label column sm={1}>Images</Form.Label>
                <Col> <Form.File className="custom-file" name="photo1" onChange={onChng} files={getFile(id, "photo1")}/> </Col>
                <Col> <Form.File className="custom-file" name="photo2" onChange={onChng} files={getFile(id, "photo2")}/> </Col>
                <Col> <Form.File className="custom-file" name="photo3" onChange={onChng} files={getFile(id, "photo3")}/> </Col>
            </Form.Group>
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

export default EditItem;