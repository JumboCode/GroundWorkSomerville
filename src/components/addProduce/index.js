import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';

const AddProduce = (props) => {
    const [entries, setEntries] = useState({})
    const [files, setFiles] = useState({})

    const [numEntries, setNumEntries] = useState(1)

    const handleInputChange = (e, id) => {
        if (e.target.type === "file") {
            setFiles({...files, [id]:{...files[id], [e.target.name]:e.target.files[0]}})
        } else {
            setEntries({...entries, [id]:{...entries[id], [e.target.name]:e.target.value}})
        }
    }

    const sendEntries = () => {
        Object.keys(entries).forEach((key) => {
            var form = new FormData();
            Object.entries(files[key]).forEach(([n, f]) => { form.append(n, f) });
            form.append('info', JSON.stringify(entries[key]))
            axios({
                method: "post",
                url: "add-produce",
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
                    <label>Unit:</label>
                    <input type="text" onChange={onChng} name="unit"/>
                    <label>Price:</label>
                    <input type="number" onChange={onChng} name="price"/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" onChange={onChng} name="description"/>
                </div>
                <label>Category:</label>
                <input type="text" onChange={onChng} name="category"/>
                <label>Photos:</label>
                <div>
                    <input type="file" onChange={onChng} name="photo"/>
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

export default AddProduce;


