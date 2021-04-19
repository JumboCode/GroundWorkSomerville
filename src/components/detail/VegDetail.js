import React, { useState, useEffect } from 'react';
import './VegDetail.css'
import { Modal } from 'react-bootstrap';
import inventoryData from "../../temp-data/inventoryData";
import Quantity from "../changeNumber/Quantity";
import Button from "../button";
import "./VegDetail.css";

const VegetableDetail = ({show, onHide, detailID}) => {
    const detail = inventoryData[0]

    // TO-DO: Fix this to access pics from the backend
    var imgArray = new Array(3);
    imgArray[0] = new Image();
    imgArray[0].src = "https://www.ikea.com/us/en/images/products/vaerdera-coffee-cup-and-saucer-white__22811_pe095649_s5.jpg?f=g";

    imgArray[1] = new Image();
    imgArray[1].src = "https://st.depositphotos.com/1000992/1555/i/950/depositphotos_15555127-stock-photo-coffee-cup-on-white-background.jpg";

    imgArray[2] = new Image();
    imgArray[2].src = 'https://media.gettyimages.com/vectors/coffee-cup-icons-acme-series-vector-id1157956463?s=2048x2048';

    const [selectedImage, setSelectedImage] = useState(imgArray[0].src);
    const [quantity, setQuantity] = useState(0);

    const getImage = (img) => {
        return (
            <a onClick={(e) => setSelectedImage(img)} key={img}>
                 <img src={img} alt="close up of product" className="small-img"></img>
            </a>
        )
    }
    const getImages = (images) => {
        var i; 
        const maps = [];
        for (i = 0; i < images.length; i++) {
            maps[i] = images[i].src; 
        }

        return(
            maps.map(getImage))
    }

    //TO-DO: change this

    const onQuantChange = (id, quantity, increment) => {
        if (increment === "up")
            setQuantity(quantity);
        if (increment === "down")
            setQuantity(quantity);
    }
    
    return (
            <div className = "veg-detail">
                <div className="container">
                    <div className="images">
                        {getImages(imgArray)}
                    </div>
                    <div className="central">
                        <img src={selectedImage} alt="main product" className="big-image"></img>
                    </div>
                    <div className="detail-description">
                        <div className="h2sub">{detail.name}</div>
                        <div className="psub">{detail.description}</div>
                        <div className="h2sub">${detail.price.toFixed(2)}</div>
                        <div> 
                        <div className="buttons">
                        <div className="psub">select quantity:</div>
                            <Quantity 
                                id = {detail.id}
                                quantity={quantity}
                                onQuantChange={onQuantChange} 
                            />  
                        </div>
                        <div className="buttons">
                            <Button>add to cart</Button>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
    )
}

export default VegetableDetail; 
