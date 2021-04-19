//NOTE: Not sure how to handle change for image 

import React from 'react';
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap';
import FileUploader from './fileUploader/index.js';
import './Entries.css'

const Entries = (props) => {
    
    function handleChange(key, e) { //Note: How to handle image change? Do something in this function? 
        let value = e.target.value
        
        if(e.target.className == 'name') {
            props.entries[key].name = value
        } else if (e.target.className == 'quantity') {
            props.entries[key].quantity = value
        }
        //console.log(props.entries)
    }


    return (
        props.entries.map((val, idx)=> {
            let entryId = 'name-$(idx}', unitsId = 'quantity-$(idx}'
            return (                
                <Container style={{'padding': '1rem'}} key={idx}> 
                    <Row>
                        <Col> Name:  <input type='text' class='name' placeholder='Name' onChange={(e) => handleChange(idx, e)}/> </Col>
                        <Col> <FileUploader/> </Col>
                    </Row> 
                    <Row>
                        <Col> Quantity: <input type='number' size='5' placeholder='0' class='quantity' onChange={(e) => handleChange(idx, e)} /> </Col>
                        
                    </Row>
                </Container> 
            )
        })
    )
}

export default Entries