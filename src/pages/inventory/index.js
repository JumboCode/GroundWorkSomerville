import React, { useState } from 'react';
import './styles.module.css';
import InventoryTab from '../../components/inventoryTab';
import InventoryFilter from '../../components/inventoryFilter';
import { Container, Row, Col } from 'react-bootstrap';

// class Inventory extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {harvest:true}
//         this.onQuantChange = this.onQuantChange.bind(this);
//     }
//     onQuantChange(newData){
//         this.setState({harvest : newData}, ()=>{
//         })
//     }

//     render() {
//     return (
//         <Container id="inventory" fluid><Row>
//             <Col><InventoryTab onQuantChange={this.onQuantChange}/></Col>
//             <Col sm={4}><InventoryFilter token={this.props.token} harvest={this.state.harvest}/></Col>
//         </Row></Container>
//     )}
// }

const Inventory = ({token}) => {

    const [harvest, setHarvest] = useState(true)
    const [updated, setUpdated] = useState(true)
    const [sD, sSD] = useState(new Date("2021/05/01"));
    const [eD, sED] = useState(new Date());


    const onQuantChange = (newData) => {
        setHarvest(newData)
    }

    return (
        <Container id="inventory" fluid><Row>
            <Col><InventoryTab onQuantChange={onQuantChange} updated={updated} token={token} update={setUpdated} sD={sD} eD={eD}/></Col>
            <Col sm={4}><InventoryFilter token={token} harvest={harvest} update={setUpdated} sD={sD} eD={eD} sSD={sSD} sED={sED}/></Col>
        </Row></Container>
    )
}

export default Inventory;