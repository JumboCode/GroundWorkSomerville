import React, { useState, useEffect } from 'react';
import './styles.css';
import EditItem from '../editItem';
import { Modal, Tab, Nav } from 'react-bootstrap';
import { Link, useRouteMatch, useLocation } from "react-router-dom";


const InventoryTab = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [produce, setProduce] = useState([]);
    const [merch, setMerch] = useState([]);
    // const { url } = useRouteMatch();
    const [popupID, setPopUpId] = useState(0);


    useEffect(() =>{
        async function test(){
            setProduce(testData)
            setMerch(testData)
        }
        test()
    }, [])

    const location = useLocation();

    const getRow = (dat) => {
        const style = { color: "grey", cursor: "pointer" }
        return(
            <tr key={dat.name}>
                <td>{dat.name}</td>
                <td>{dat.price}</td>
                <td>{dat.sold}</td>
                <td>{dat.available}</td>
                {/* <td>  <Link
                        key={dat.id}
                        to={{
                            pathname: `/img/${dat.id}`,
                            // This is the trick! This link sets
                            // the `background` in location state.
                            state: { background: location }
                        }}
                        > edit </Link> */}
                    {/* <span data-target="#editModal" data-toggle="modal"><a href={"#"+ dat.id} role="button" onClick={()=> setShowAddItem(true)} class="btn btn-primary">edit</a></span> */}
                <td> <a onClick={()=> {setShowAddItem(true); setPopUpId(dat.id);}} style={style}>edit</a> </td>
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
{id: 11,name: "Apple", price: 12, sold: 4, available: 5}]