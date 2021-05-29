import React, { useState, useEffect } from 'react';
import './styles.css';
import EditItem from '../editItem';
import { Tab, Nav, Container, Row, Col, Modal } from 'react-bootstrap';
// import ProduceItem from "./ProduceItem";
import axios from 'axios';


const InventoryTab = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [produce, setProduce] = useState([]);
    const [merch, setMerch] = useState([]);
    const [popupID, setPopUpId] = useState(0);
    const [harvest, setHarvest] = useState([]);


    useEffect(() =>{
        axios.get('merchandise-inventory')
        .then((resp) => {
            setMerch(resp.data)
        })

        axios.get('harvest-inventory', {params: {start_date: "2021-04-05", end_date: "2021-05-21"}})
        .then((resp) => {
            setHarvest(resp.data)
        })

        axios.get('produce-inventory')
        .then((resp) => {
            setProduce(resp.data)
        })
    }, [props.updated])

    const showEdit = (e, i) => {
        // setShowAddItem(true);
        // setPopUpId(dat.id);
        console.log(i)
    }
    const getRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={dat.name}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.total_sold}</td>
                <td>{dat.total_available}</td>
                <td> <div onClick={(e) => {showEdit(e, dat)}} style={style}>edit</div> </td>
            </tr>
        )
    }

    const getTable = (items) => {
        return(
            <div className="fixedHeader">
                <table className="inventory-table">
                    <thead>
                        <tr><th>Product</th>
                        <th>Price</th>
                        <th>Sold</th>
                        <th>Left</th>
                        <th></th></tr>
                    </thead>
                    <tbody>{items.map(getRow)}</tbody>
                </table>
            </div>
        )
    }

    const getProduceItem = (dat) => {
        return (
            <Container className="produce-card" key={dat['name']}>
                <Row>
                    <Col sm={5}>
                        <img src={dat['photo']} alt={dat['name']} className="produce-inv-img" />
                    </Col>
                    <Col className="produce-texts">
                        <Row><Col>{dat['name']}</Col></Row>
                        <Row><Col>${dat['price']} / {dat['unit']}</Col></Row>
                        <Row><Col className="produce-edit">edit</Col></Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    const getProduceTable = (produce) => {
        return(
            <div className="produce-cards">
                {produce.map(getProduceItem)}
            </div>)
    }

    return (
        <div id="inventory-tab">
            <Tab.Container defaultActiveKey="merch">
                <Nav>
                    <Nav.Link as="div" eventKey="harvest" className="tab-button" onClick={(e)=> props.onQuantChange(true)}>
                        Harvest Inventory
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="merch" className="tab-button" onClick={(e)=>props.onQuantChange(false)}>
                        Merchandise Inventory
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="produce" className="tab-button" onClick={(e)=>props.onQuantChange(false)}>
                        Produce Inventory
                    </Nav.Link>
                </Nav>
                <Tab.Content className="hello123">
                <Tab.Pane eventKey="harvest" title="Harvest Inventory">
                    {getTable(harvest)}
                </Tab.Pane>
                <Tab.Pane eventKey="merch" title="Merchandise Inventory">
                    {getTable(merch)}
                </Tab.Pane>
                <Tab.Pane eventKey="produce" title="Produce Inventory">
                    {getProduceTable(produce)}
                </Tab.Pane>
                
                </Tab.Content>
            </Tab.Container>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <Modal.Header closeButton><Modal.Title>Edit Merchandise </Modal.Title></Modal.Header>
                <EditItem id={popupID}/>
            </Modal>

            {/* <EditItem show={showAddItem} onHide={()=> setShowAddItem(false)} id={popupID}/> */}
        </div>
    )
}

export default InventoryTab;