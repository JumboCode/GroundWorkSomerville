import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form, Row, Col} from 'react-bootstrap';

// const AddHarvest = (props) => {
//     const [entries, setEntries] = useState({})

//     const [numEntries, setNumEntries] = useState(1)

//     const handleInputChange = (e, id) => {
//         setEntries({...entries, [id]:{...entries[id], [e.target.name]:e.target.value}})
//     }

//     const sendEntries = () => {
//         Object.keys(entries).forEach((key) => {
//             var form = new FormData();
//             form.append('info', JSON.stringify(entries[key]))
//             axios({
//                 method: "post",
//                 url: "add-harvest",
//                 data: form,
//                 headers: { "Content-Type": "multipart/form-data" },
//               })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (response) {
//                 console.log(response);
//             });
//         })
//     }

//     const entry = (id) => {
//         const onChng = (e) => handleInputChange(e, id)
//         return(
//             <div className="add-produce-entry" key={"produce-entry-"+id}>
//                 <div>
//                     <label>Name:</label>
//                     <input type="text" onChange={onChng} name="name"/>
//                     <label>Quantity:</label>
//                     <input type="number" onChange={onChng} name="quantity"/>
//                     <label>Weight:</label>
//                     <input type="number" onChange={onChng} name="weight"/>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div>
//             {[...Array(numEntries).keys()].map(entry)}
//             <Button onClick={() => setNumEntries(numEntries + 1)}> Add A New Item </Button>
//             <Button className="add-merch-button" onClick={sendEntries}>Save</Button>
//         </div>
//     )
// }

// export default AddHarvest;



const AddHarvest = (props) => {
    const [entries, setEntries] = useState({})
    const [entrySucc, setEntrySucc] = useState(false)

    const onChng = (e) => {
        setEntries({...entries, [e.target.name]:e.target.value})
    }

    const sendEntries = (e) => {
        e.preventDefault()
        var form = new FormData();
        form.append('info', JSON.stringify(entries))
        axios({
            method: "post",
            url: "add-harvest",
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
    }

    
    // const entry = (id) => {
    //     return(
    //         <Form key={"produce-entry-"+id} className="add-produce-entry" as="div" onSubmit={sendEntries}>
    //             <Row>
    //                 <Col>
    //                     <Form.Group as={Row}>
    //                         <Form.Label column sm={1}>Name</Form.Label>
    //                         <Col><Form.Control name="name" onChange={onChng} required/></Col>
    //                     </Form.Group>
    //                 </Col>
    //             </Row>
    //             <Row>
    //                 <Col>
    //                     <Form.Group as={Row}>
    //                         <Form.Label column sm={3}>Quantity</Form.Label>
    //                         <Col><Form.Control type="number" name="quantity" onChange={onChng} required/></Col>
    //                     </Form.Group>
    //                 </Col>
    //                 <Col>
    //                     <Form.Group as={Row}>
    //                         <Form.Label column sm={2}>Weight</Form.Label>
    //                         <Col><Form.Control name="weight" type="number" onChange={onChng} required/></Col>
    //                     </Form.Group>
    //                 </Col>
    //             </Row>
    //             <Button className="add-produce-button">Save</Button>
    //         </Form>
    //     )
    // }

    return (
        <div>
            <Form className="add-produce-entry" onSubmit={sendEntries}>
                <Row>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label column sm={1}>Name</Form.Label>
                            <Col><Form.Control name="name" onChange={onChng} required/></Col>
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
            {entrySucc && <div class="text-success ml-2">Successfully added entry</div>}
        </div>
    )
}

export default AddHarvest;