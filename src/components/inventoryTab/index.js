import React, { useState, useEffect } from 'react';
import './styles.css';
import EditItem from '../editItem';
import { Modal, Tab, Nav } from 'react-bootstrap';
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import ProduceItem from "./ProduceItem";


const InventoryTab = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [produce, setProduce] = useState([]);
    const [merch, setMerch] = useState([]);
    const [harvest, setHarvest] = useState([]);
    const [popupID, setPopUpId] = useState(0);


    useEffect(() =>{
        setProduce(testData)
        setMerch(testData)
        setHarvest(testData)
    }, [])

    const getRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={dat.name}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.sold}</td>
                <td>{dat.available}</td>
                <td> <a onClick={()=> {setShowAddItem(true); setPopUpId(dat.id+1);}} style={style}>edit</a> </td>
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


    const getProduceRows = (items) => {
        var i, j;
        const maps = [];
        for (i = 0; i < (items.length/3); i++){ //TODO: fix this
            maps[i] =  [];
            for (j = 0; j < 3; j++) {
                maps[i][j] = items[(i*3+j)];
            }
        }
        return (
            <tbody>
                {maps.map(getProduceRow)}
            </tbody>
        )
       
    }

    const getProduceRow = (row) => {
        return (
            <tr key={row[0]}>
                <td><ProduceItem item={row[0]} setShowAddItem={setShowAddItem} setPopUpId={setPopUpId}/></td>
                <td>{<ProduceItem item={row[1]} setShowAddItem={setShowAddItem} setPopUpId={setPopUpId}/>}</td>
                <td>{<ProduceItem item={row[2]} setShowAddItem={setShowAddItem} setPopUpId={setPopUpId}/>}</td>
            </tr>
        )
        
    }

    const getProduceTable = (items) => {
        return (
            <div className="fixedHeader">
                <table className="inventory-table">
                    {getProduceRows(items)}
                </table>
            </div>
        )
    }

    return (
        <div id="inventory-tab">
            <Tab.Container defaultActiveKey="harvest">
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
                    {/* {getProduceTable(produce)} */}
                </Tab.Pane>
                
                </Tab.Content>
            </Tab.Container>
            <EditItem show={showAddItem} onHide={()=> setShowAddItem(false)} id={popupID}/>

        </div>
    )
}

export default InventoryTab;

const testData = [{id: 0, name: "Spinach", price: 12, sold: 4, available: 5},
{id: 1, name: "Bell Peppers", price: 12, sold: 4, available: 5},
{id: 2,name: "Grapes", price: 12, sold: 4, available: 5},
{id: 3,name: "Cilantro", price: 12, sold: 4, available: 5},
{id: 4,name: "Cauliflowers", price: 12, sold: 4, available: 5},
{id: 5,name: "Oranges", price: 12, sold: 4, available: 5},
{id: 6,name: "Bell Pepper", price: 12, sold: 4, available: 5},
{id: 7,name: "Grape", price: 12, sold: 4, available: 5},
{id: 8,name: "Cilantros", price: 12, sold: 4, available: 5},
{id: 9,name: "Cauliflower", price: 12, sold: 4, available: 5},
{id: 10,name: "Orange", price: 12, sold: 4, available: 5},
{id: 1, name: "Bell Peppers", price: 12, sold: 4, available: 5},
{id: 2,name: "Grapes", price: 12, sold: 4, available: 5},
{id: 3,name: "Cilantro", price: 12, sold: 4, available: 5},
{id: 4,name: "Cauliflowers", price: 12, sold: 4, available: 5},
{id: 5,name: "Oranges", price: 12, sold: 4, available: 5},
{id: 6,name: "Bell Pepper", price: 12, sold: 4, available: 5},
{id: 7,name: "Grape", price: 12, sold: 4, available: 5},
{id: 8,name: "Cilantros", price: 12, sold: 4, available: 5},
{id: 9,name: "Cauliflower", price: 12, sold: 4, available: 5},
{id: 10,name: "Orange", price: 12, sold: 4, available: 5},
{id: 11,name: "Apple", price: 12, sold: 4, available: 5}]