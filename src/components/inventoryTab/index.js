import React, { useState, useEffect } from 'react';
import './styles.css';
import EditItem from '../editItem';
import EditProduce from '../editProduce';
import { Tab, Nav, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';


const InventoryTab = ({token, onQuantChange, updated, update, sD, eD}) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [produce, setProduce] = useState([]);
    const [merch, setMerch] = useState([]);
    const [popupID, setPopUpId] = useState(0);
    const [harvest, setHarvest] = useState([]);
    const [prodPurchases, setProduPurchases] = useState([]);
    const [merchPurchases, setMerchPurchases] = useState([]);
    const [showEditProduce, setShowEditProduce] = useState(false)

    useEffect(() =>{
        axios.get('merchandise-inventory', {headers: {'Authorization': `Token ${token}`}})
        .then((resp) => {
            setMerch(resp.data)
        })

        axios.get('produce-inventory', {headers: {'Authorization': `Token ${token}`}})
        .then((resp) => {
            setProduce(resp.data)
        })

        axios.get('produce-purchases')
        .then((resp) => {
            setProduPurchases(resp.data)
        })

        axios.get('merchandise-purchases')
        .then((resp) => {
            setMerchPurchases(resp.data)
        })

    }, [updated])

    useEffect(() => {
        const startDate = sD.getFullYear() + '-' + (sD.getMonth()+1) + '-' + sD.getDate()
        const endDate = eD.getFullYear() + '-' + (eD.getMonth()+1) + '-' + eD.getDate()

        axios.get('harvest-inventory', {params: {start_date: startDate, end_date: endDate}})
        .then((resp) => {
            setHarvest(resp.data)
        })
    }, [updated, sD, eD])

    const showEdit = (e, i) => {
        setPopUpId(i);
        setShowAddItem(true);
    }

    const showProduceEdit = (e, i) => {
        setPopUpId(i);
        setShowEditProduce(true)
    }

    const getRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={dat.id}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.total_sold}</td>
                <td>{dat.total_available}</td>
                <td> <div onClick={(e) => {showEdit(e, dat.id)}} style={style}>edit</div> </td>
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
        const style = { color: "grey", cursor: "pointer" }
        return (
            <Container className="produce-card" key={dat['id']}>
                <Row>
                    <Col sm={5}>
                        <img src={dat['photo']} alt={dat['name']} className="produce-inv-img" />
                    </Col>
                    <Col className="produce-texts">
                        <Row><Col>{dat['name']}</Col></Row>
                        <Row><Col>${dat['price']} / {dat['unit']}</Col></Row>
                        <Row><Col className="produce-edit" onClick={(e) => showProduceEdit(e, dat.id)} style={style}>edit</Col></Row>
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

    const getPurchaseRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={"purchase"+dat.user_name}>
                <td>{dat.user_name}</td>
                <td>{dat.total_owed}</td>
                <td>{dat.last_paid}</td>
                <td>{dat.last_ordered}</td>
                <td> <div onClick={(e) => {showEdit(e, dat.id)}} style={style}>edit</div> </td>
            </tr>
        )
    }

    const getMerchPurchaseRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={"merch" + dat.receipt_number}>
                <td>{dat.date_bought}</td>
                <td>{dat.total_owed}</td>
                <td>{dat.paid}</td>
                <td>{dat.picked_up}</td>
                <td> <div onClick={(e) => {showEdit(e, dat.id)}} style={style}>edit</div> </td>
            </tr>
        )
    }


    const getProdPurchaseTable = (purchases) => {
        return(
            <div className="fixedHeader">
                <table className="inventory-table">
                    <thead>
                        <tr><th>User Name</th>
                        <th>Total Owed</th>
                        <th>Last Paid</th>
                        <th>Last Ordered</th>
                        <th></th></tr>
                    </thead>
                    <tbody>{purchases.map(getPurchaseRow)}</tbody>
                </table>
            </div>
        )
    }

    const getMerchPurchaseTable = (purchases) => {
        return(
            <div className="fixedHeader">
                <table className="inventory-table">
                    <thead>
                        <tr><th>Receipt Number</th>
                        <th>Date Bought</th>
                        <th>Total Owed</th>
                        <th>Paid</th>
                        <th>Picked up</th>
                        <th></th></tr>
                    </thead>
                    <tbody>{purchases.map(getMerchPurchaseRow)}</tbody>
                </table>
            </div>
        )
    }

    const getHarvestRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={"harvest"+dat.id}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.total_available}</td>
                <td>{dat.total_sold}</td>
                <td>{dat.unit}</td>
                <td> <div onClick={(e) => {showEdit(e, dat.id)}} style={style}>edit</div> </td>
            </tr>
        )
    }

    const getHarvestTable = () => {
        return(
            <div className="fixedHeader">
                <table className="inventory-table">
                    <thead>
                        <tr><th>Name</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Sold</th>
                        <th>Unit</th>
                        <th></th></tr>
                    </thead>
                    <tbody>{harvest.map(getHarvestRow)}</tbody>
                </table>
            </div>
        )

    }


    return (
        <div id="inventory-tab">
            <Tab.Container defaultActiveKey="harvest">
                <Nav>
                    <Nav.Link as="div" eventKey="harvest" className="tab-button" onClick={(e)=> onQuantChange(true)}>
                        Harvest
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="merch" className="tab-button" onClick={(e)=>onQuantChange(false)}>
                        Merchandise
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="produce" className="tab-button" onClick={(e)=>onQuantChange(false)}>
                        Produce
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="prodPurch" className="tab-button" onClick={(e)=>onQuantChange(false)}>
                        Produce Purchase
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="merchPurch" className="tab-button" onClick={(e)=>onQuantChange(false)}>
                        Merchandise Purchase
                    </Nav.Link>

                </Nav>
                <Tab.Content className="hello123">
                <Tab.Pane eventKey="harvest" title="Harvest Inventory">
                    {getHarvestTable()}
                </Tab.Pane>
                <Tab.Pane eventKey="merch" title="Merchandise Inventory">
                    {getTable(merch)}
                </Tab.Pane>
                <Tab.Pane eventKey="produce" title="Produce Inventory">
                    {getProduceTable(produce)}
                </Tab.Pane>
                <Tab.Pane eventKey="prodPurch" title="Produce Purchases">
                    {getProdPurchaseTable(prodPurchases)}
                </Tab.Pane>
                <Tab.Pane eventKey="merchPurch" title="Produce Purchases">
                    {getMerchPurchaseTable(merchPurchases)}
                </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <Modal.Header closeButton><Modal.Title>Edit Merchandise </Modal.Title></Modal.Header>
                <EditItem id={popupID} update={update} token={token}/>
            </Modal>

            <Modal show={showEditProduce} onHide={()=> setShowEditProduce(false)} size="lg" centered>
                <Modal.Header closeButton><Modal.Title>Edit Produce </Modal.Title></Modal.Header>
                <EditProduce id={popupID} update={update} token={token}/>
            </Modal>


        </div>
    )
}

export default InventoryTab;