import React, { useState, useEffect } from 'react';
import './styles.css';
import EditItem from '../editItem';
import { Modal, Tab, Nav } from 'react-bootstrap';

const InventoryTab = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [produce, setProduce] = useState([]);
    const [merch, setMerch] = useState([]);

    useEffect(() =>{
        async function test(){
            setProduce(testData)
            setMerch(testData)
        }
        test()
    }, [])

    const getRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={dat.name}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.sold}</td>
                <td>{dat.available}</td>
                <td><a onClick={()=> setShowAddItem(true)} style={style}>edit</a></td>
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

    return (
        <div id="inventory-tab">
            <Tab.Container defaultActiveKey="produce">
                <Nav>
                    <Nav.Link as="div" eventKey="produce" className="tab-button">
                        Produce Inventory
                    </Nav.Link>
                    <Nav.Link as="div" eventKey="merch" className="tab-button">
                        Merchandise Inventory
                    </Nav.Link>
                </Nav>
                <Tab.Content>
                <Tab.Pane eventKey="produce" title="Produce Inventory">
                    {getTable(produce)}
                </Tab.Pane>
                <Tab.Pane eventKey="merch" title="Merchandise Inventory">
                    {getTable(merch)}
                </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <EditItem/>
            </Modal>
        </div>
    )
}

export default InventoryTab;

const testData = [{name: "Spinach", price: 12, sold: 4, available: 5},
{name: "Bell Peppers", price: 12, sold: 4, available: 5},
{name: "Grapes", price: 12, sold: 4, available: 5},
{name: "Cilantro", price: 12, sold: 4, available: 5},
{name: "Cauliflowers", price: 12, sold: 4, available: 5},
{name: "Oranges", price: 12, sold: 4, available: 5},
{name: "Bell Pepper", price: 12, sold: 4, available: 5},
{name: "Grape", price: 12, sold: 4, available: 5},
{name: "Cilantros", price: 12, sold: 4, available: 5},
{name: "Cauliflower", price: 12, sold: 4, available: 5},
{name: "Orange", price: 12, sold: 4, available: 5},
{name: "Apple", price: 12, sold: 4, available: 5}]