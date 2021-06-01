import React, { useState } from 'react';
import './styles.css';
import Button from '../button/index.js';
import axios from 'axios';
import {Form} from 'react-bootstrap';

const EditHarvest = ({id, update, token, editDat}) => {
    const [entries, setEntries] = useState({is_paid:editDat[0], is_picked:editDat[1]})
    const [entrySucc, setEntrySucc] = useState(false)

    const submitData = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            url: "edit-merchandise-purchases/" + id,
            data: entries,
            headers: { "Content-Type": "application/json", 'Authorization': `Token ${token}`},
        })
        .then(function (resp) {
            setEntrySucc(true)
            update("harvest-update" + id)
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    const onChng = (e) => {
        setEntries({...entries, [e.target.name]:e.target.checked})
    }

    return (
        <div>
            <Form className="add-merch-entry" onSubmit={submitData}>
                <input type="checkbox" id="Paid" name="is_paid" value="Paid" onChange={onChng} checked={entries['is_paid']}/>
                <label htmlFor="Paid"> Paid</label><br/>
                <input type="checkbox" id="Picked" name="is_picked" value="Picked" onChange={onChng} checked={entries['is_picked']}/>
                <label htmlFor="Picked"> Picked Up</label><br/>
                {entrySucc && <div className="text-success ml-2">Successfully edited entry</div>}
                <Button className="add-merch-button">Save edits</Button>
            </Form>
        </div>
    )
}

export default EditHarvest;