import React, { useState, useEffect } from 'react';
import './VegDetail.css'
import Quantity from "../changeNumber/Quantity";
import Button from "../button";
import "./VegDetail.css";
import axios from 'axios';

const VegetableDetail = ({show, onHide, detailID}) => {
    const loadingGIF = "https://i.stack.imgur.com/kOnzy.gif"
    const [details, setDetails] = useState({})
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(loadingGIF);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        axios.get('merch-detail/' + detailID)
        .then((resp) => {
            setDetails(resp.data)
            setImages(resp.data['photo_urls'])
            setSelectedImage(resp.data['photo_urls'][0])
        })
    }, [])

    const getImage = (img) => {
        return (
            <a onClick={(e) => setSelectedImage(img)} key={img}>
                 <img src={img} alt="close up of product" className="small-img"></img>
            </a>
        )
    }

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
                        {images.map(getImage)}
                    </div>
                    <div className="central">
                        <img src={selectedImage} alt="main product" className="big-image"></img>
                    </div>
                    <div className="detail-description">
                        <div className="h2sub">{details.name}</div>
                        <div className="psub">{details.description}</div>
                        <div className="h2sub">${details.price}</div>
                        <div> 
                        <div className="buttons">
                        <div className="psub">select quantity:</div>
                            <Quantity 
                                id = {details.id}
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
