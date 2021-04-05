import React from 'react';
import PropTypes from 'prop-types'
import Name from './Name'
import Button from '../../button/index.js'
import ItemType from './ItemType'
import Units from './Units'
import Price from './Price'
import { Container, Row, Col } from 'react-bootstrap';
import FileUploader from './fileUploader';
import './Entries.css'

const Entries = (props) => {

    
    // Function: print and change the new values at the right index
    function handleChange(key, e) {

        let value = e.target.value

        // console.log('value:', value)
        // console.log('e:', e)
        // // console.log('key', key)
        
        if(e.target.className == 'name') {
            props.entries[key].name = value
        } else if (e.target.className == 'units') {
            props.entries[key].units = value
        } else if (e.target.className == 'price') {
            props.entries[key].price = value
        }
        console.log(props.entries)

    }


    return (
        props.entries.map((val, idx)=> {
            let entryId = 'name-$(idx}', unitsId = 'units-$(idx}', priceId = 'price-$(idx}'
            console.log('key:', idx)
            return (
                <div style={{'padding': '1rem'}} key={idx}>
                
                <Container> 
                
                <Row>
                    <Col> Name:  <input type='text' 
                                  class='name' placeholder='Name' 
                                  onChange={(e) => handleChange(idx, e)}
                                  /> 
                    </Col>
                    <Col> <FileUploader/> </Col>
                </Row> 
                <Row>
                    
                    <Col xs="3"> 
                        {/* <Units class='units'/>  */}
                        Units: <input 
                                    type='number'
                                    size='5'
                                    placeholder='0'
                                    class='units'
                                    onChange={(e) => handleChange(idx, e)}
                                    />
                    </Col>


                    <Col xs="4"> 
                        Price: $<input 
                                    type='text'
                                    placeholder='   0.00'
                                    class='price'
                                    onChange={(e) => handleChange(idx, e)}
                                    /> 
                    </Col>

                    <Col> 
                    </Col>

                    <Col> 
                    </Col>


                    </Row>

                </Container> 

            </div>
            )  
        })
    )
}

export default Entries