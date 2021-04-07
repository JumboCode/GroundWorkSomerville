/* NOTES 
 * 
 * Note 1: Not sure how to handle image saving, add to state somehow? (line 16, 31)
 * 
 * Note 2: Not sure how to use onHide to hide component with button, currently only have closeButton from modal header (line 64)
 */ 
import React from 'react';
import './styles.module.css';
import Entries from './components/Entries.js'
import Button from '../button/index.js'
import { Col, Row, Modal } from 'react-bootstrap'

class AddItem extends React.Component {

    state = {
        products: [{name:"", units:"", price:"",image:null}]  //See Note 1
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
        this.setState((prevState) => ({ products: [...prevState.products, {name:"", units:"", price: "", file:null}]})); //See Note 1 
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
                <Modal.Header closeButton style={{'border-bottom':'none 0'}}/> 
                
                <Modal.Body  style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>

                    <Entries entries={products}/> 
    
                </Modal.Body>
                
                <Row>   

                    <Col/>  

                    <Col style={{'content-align': 'center'}}> 
                        <Button onClick={this.addProduct}> Add A New Item </Button>
                    </Col>

                    <Col/> 

                </Row>

                <Row style={{'padding': '20px'}}> 

                    {/* See Note 2  */}
                    {/* <Col>  <Button closeButton> Cancel </Button> </Col>  */}

                    <Col>  <Button onClick={this.printProducts} className="float-right">Save</Button> </Col>

                </Row>

            </div>
        )
    }
}
export default AddItem;


