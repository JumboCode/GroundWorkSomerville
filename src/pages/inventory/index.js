import React from 'react';
import './styles.module.css';
import InventoryTab from '../../components/inventoryTab';
import InventoryFilter from '../../components/inventoryFilter';
import { Container, Row, Col } from 'react-bootstrap';

const Inventory = ({token}) => {
    return (
        <Container id="inventory" fluid><Row>
            <Col><InventoryTab/></Col>
            <Col sm={4}><InventoryFilter token={token}/></Col>
        </Row></Container>
    )
}

export default Inventory;