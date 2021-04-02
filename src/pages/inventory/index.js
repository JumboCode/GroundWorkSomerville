import React, {Component} from 'react';
import './styles.module.css';
import InventoryTab from '../../components/inventoryTab';
import InventoryFilter from '../../components/inventoryFilter';
import { Container, Row, Col } from 'react-bootstrap';

class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {harvest:true}
        this.onQuantChange = this.onQuantChange.bind(this);
    }
    onQuantChange(newData){
        this.setState({harvest : newData}, ()=>{
        })
    }

    render() {
    return (
        <Container id="inventory" fluid><Row>
            <Col><InventoryTab onQuantChange={this.onQuantChange}/></Col>
            <Col sm={4}><InventoryFilter token={this.props.token} harvest={this.state.harvest}/></Col>
        </Row></Container>
    )}
}

export default Inventory;