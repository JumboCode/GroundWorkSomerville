import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import useAxios from 'axios-hooks';


function InventoryItem(props) {
    return (
        <div className="inventory-item">
            {props.name}
        </div>
    );
}

function ItemTable(props) {
    console.log(useAxios("/list-vegetables"));
    var veggies = [{name: "potate"}, {name: "beet"}];
    var items = veggies.map((item) => {
        return <InventoryItem name={item.name} />;    
    });

    return (
        <div className="inventory">
            {items}
        </div>
    );
}

class Inventory extends React.Component {
    render() {
        return <ItemTable />;
    }
}

ReactDOM.render(
    <Inventory />,
    document.getElementById('root')
);
