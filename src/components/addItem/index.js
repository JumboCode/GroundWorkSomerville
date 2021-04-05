//TODO: add image to products state array
//TODO: something with json
//TODO: what to do on cancel button and save button? (currently save just prints state to console)

import React from 'react';
import './styles.module.css';
import Entries from './components/Entries.js'
import Button from '../button/index.js'
import { Container, Col, Row, Modal } from 'react-bootstrap'

class AddItem extends React.Component {

    state = {
        products: [{name:"", units:"", price:""}]
    }

    handleChange = (e) => {
        if(["name","units","price"].includes(e.target.className)) {
            let products = [...this.state.products]
            products[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({products}, () => console.log(this.state.products))
        } else {
            this.setState({[e.target.nane]: e.target.value.toUpperCase() })
        }
    }

    addProduct = (e) => {
        this.setState((prevState) => ({
            products: [...prevState.products, {name:"", units:"", price: ""}],
        }));
    }

    printProducts = (e) =>  {
        this.state.products.map((product, idx) => {
            if (product.name == "" && product.units == "" && product.price == "") {
                this.state.products.splice(idx,1)
            }
        })    
        console.log('On Save:', this.state)
        }
    

    handleSubmit = (e) => { e.preventDefault() }

    render() { 
        let {products} = this.state
        return (
            <div> 
            {/* <Modal.Header closeButton>
                <Modal.Title as="title">Add Item</Modal.Title>
            </Modal.Header> */}
            <Modal.Body  style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                <Entries entries={products}/> 
            </Modal.Body>
            
            <Row>   
            <Col> </Col>              
                <Col style={{'content-align': 'center'}}> 
                <Button onClick={this.addProduct}> Add A New Item </Button>
                </Col>
            <Col></Col> 
            </Row>
            <Row style={{'padding': '20px'}}> 
                <Col>  <Button onClick={this.hide}> Cancel </Button> </Col>
                <Col>  <Button onClick={this.printProducts} className="float-right">Save</Button> </Col>
            </Row>
            </div>
        )
    }

}

export default AddItem;

//TODO upload image thing
//Bug where first empty part is not showing

