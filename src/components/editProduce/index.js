import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

const EditProduce = ({update, id}) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})
    const[oldFiles, setOldFiles] = useState([])
    const [entrySucc, setEntrySucc] = useState(false)

    useEffect(()=>{
        axios.get('produce-detail/' + id)
        .then((resp) => {
            console.log(resp.data)
            // const {photo_urls, ...entry} = resp.data
            // setEntries(entry)
            // setOldFiles(photo_urls)
            // console.log(photo_urls)
        })
    }, [id])

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles({...files, [e.target.name]:e.target.files[0]})
        } else {
            setEntries({...entries, [e.target.name]:e.target.value})
        }
    }

    // const submitData = () => {
    //     var form = new FormData();
    //     form.append('image', image);
    //     form.append('info', JSON.stringify({...formData, oldname:"Grapes", categories:"Vegetable"}))
    //     axios({
    //         method: "post",
    //         url: "update-produce",
    //         data: form,
    //         headers: { "Content-Type": "multipart/form-data" },
    //       })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (response) {
    //         console.log(response);
    //     });
    // }

    const sendEntries = (e) => {
        e.preventDefault()
        var form = new FormData();
        Object.entries(files).forEach(([n, f]) => { form.append(n, f) });
        form.append('info', JSON.stringify(entries))
        axios({
            method: "post",
            url: "add-merchandise",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            console.log(response)
            // update(key+i)
            setEntrySucc(true)
        })
        .catch(function (response) {
            console.log(response)
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
            <Form key={"produce-entry-"+id} className="add-produce-entry" >
            <Row>
                <Col sm={5}>
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
                <Col> <Form.File className="custom-file" required name="photo" onChange={onChng}/> </Col>
            </Form.Group>
            {entrySucc[i] && <div className="text-success ml-2">Successfully added entry</div>}
            <Button className="add-merch-button">Save all</Button>

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