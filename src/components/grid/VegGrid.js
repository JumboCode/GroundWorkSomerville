import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './VegGrid.css';
import VegDetail from '../detail/VegDetail';


const VegGrid = (props) => {
    const [showDetail, setShowDetail] = useState(false);
    const [detailID, setDetailID] = useState("");
    const { vegData, addToCart } = props;

    const openDetail = (event) => {
        setDetailID(event.target.id)
        setShowDetail(true)
    }
     
    const getSingleCard = (dat) => {
        return (
            <div className="veg-card" key={dat["id"]} onClick={openDetail} id={dat["id"]}>
                <div className="img-container" id={dat["id"]}>
                    <img src={dat['photo_url']} alt={dat['name']} className="veg-img" id={dat["id"]} />
                </div>
                <div className="text-container" id={dat["id"]}>
                    {dat['name']}
                </div>
                <div className="price-container" id={dat["id"]}>
                    ${dat['price']}
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
                <Modal.Header closeButton/>
                <VegDetail detailID={detailID} addToCart={addToCart} onHide={()=>setShowDetail(false)}/>
            </Modal>
        </div>
    );
}

export default VegGrid;