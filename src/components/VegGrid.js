import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './VegGrid.css';
import VegDetail from './VegDetail';


const VegGrid = (props) => {
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState("");
    const { vegData } = props;

    const openDetail = (event) => {
        setShowDetail(true);
        setDetail(event.target.getAttribute("data"))
    }

    const getSingleCard = (dat) => {
        return (
            <div className="veg-card" key={dat["id"]} onClick={openDetail}>
                <div className="img-container" data={dat["id"]}>
                    <img src={dat['photo']} alt={dat['name']} className="veg-img" data={dat["id"]} />
                </div>
                <div className="text-container" data={dat["id"]}>
                    {dat['name']}
                </div>
            </div>
        );
    }

    return (
        <div id = "veg-grid">
            <div className="veg-cards">
                {vegData.map(getSingleCard)}
            </div>
            <Modal show={showDetail} size="lg" centered onHide={()=> setShowDetail(false)}>
                <VegDetail id={detail}/>
            </Modal>
        </div>
    );
}

export default VegGrid;