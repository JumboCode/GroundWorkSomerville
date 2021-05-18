import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';

const AddHarvest = (props) => {
    const [entries, setEntries] = useState({})

    const [numEntries, setNumEntries] = useState(1)

    const handleInputChange = (e, id) => {
        setEntries({...entries, [id]:{...entries[id], [e.target.name]:e.target.value}})
    }

    const sendEntries = () => {
        Object.keys(entries).forEach((key) => {
            var form = new FormData();
            form.append('info', JSON.stringify(entries[key]))
            axios({
                method: "post",
                url: "add-harvest",
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
              })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        })
    }

    const entry = (id) => {
        const onChng = (e) => handleInputChange(e, id)
        return(
            <div className="add-produce-entry" key={"produce-entry-"+id}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={onChng} name="name"/>
                    <label>Quantity:</label>
                    <input type="number" onChange={onChng} name="quantity"/>
                    <label>Weight:</label>
                    <input type="number" onChange={onChng} name="weight"/>
                </div>
            </div>
        )
    }

    return (
        <div>
            {[...Array(numEntries).keys()].map(entry)}
            <Button onClick={() => setNumEntries(numEntries + 1)}> Add A New Item </Button>
            <Button className="add-merch-button" onClick={sendEntries}>Save</Button>
        </div>
    )
}

export default AddHarvest;


