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
        } else if (e.target.className == 'units') {
            props.entries[key].units = value
        } else if (e.target.className == 'price') {
            props.entries[key].price = value
        }

        //console.log(props.entries)
    }


    return (
        props.entries.map((val, idx)=> {
            let entryId = 'name-$(idx}', unitsId = 'units-$(idx}', priceId = 'price-$(idx}'
            return (                
                <Container style={{'padding': '1rem'}} key={idx}> 
                    <Row>
                        <Col> Name:  <input type='text' class='name' placeholder='Name' onChange={(e) => handleChange(idx, e)}/> </Col>
                        <Col> <FileUploader/> </Col>
                    </Row> 
                    <Row>
                        <Col xs="3"> Units: <input type='number' size='5' placeholder='0' class='units' onChange={(e) => handleChange(idx, e)} /> </Col>
                        <Col xs="4"> Price: $<input type='text' placeholder='   0.00' class='price' onChange={(e) => handleChange(idx, e)} /> </Col>
                    </Row>
                </Container> 
            )
        })
    )
}

export default Entries