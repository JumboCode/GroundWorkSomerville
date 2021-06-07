import React, { useState, useEffect } from 'react';
import './VegDetail.css'
import Quantity from "../changeNumber/Quantity";
import Button from "../button";
import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import "./VegDetail.css";
import axios from 'axios';

const VegetableDetail = ({onHide, detailID, addToCart}) => {
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
    }, [detailID])

    const getImage = (img, i) => {
        return (
            <Nav.Link as="div" key={i} id={i} onClick={(e) => setSelectedImage(img)} className="detail-nav" eventKey={i}>
                <img src={img} alt="product" className="prod-thumbnails"/>
            </Nav.Link>
        )
    }

    const onQuantChange = (id, quantity, increment) => {
        setQuantity(quantity)
    }
    
    const editCart = () => {
        if (quantity !== 0){
            addToCart(details.name, 
                { "value": {"id": detailID},
                 "price":details.price,
                 "quantity":quantity,
                 "available":details.available,
                 "photo_url":images[0]})
            onHide()
        }
    }

    return (
        <Container>
            <Row><div className="detail-close"><span onClick={onHide}>x</span></div></Row>
            <Row>
                <Col xs={2}>
                    <Tab.Container defaultActiveKey={0}><Nav>
                        {images.map(getImage)}
                    </Nav></Tab.Container>
                </Col>
                <Col className="img-cont" xs={5}>
                    <img src={selectedImage} alt="main product" className="big-image"/>
                </Col>
                <Col>
                    <div className="detail-title">{details.name}</div>
                    <div className="detail-desc">{details.description}</div>
                    <div className="detail-price">${details.price}</div>
                    Select quantity:
                    <div className="detail-actions">
                        <span className="detail-quant">
                            <Quantity id = {details.id} quantity={quantity} onQuantChange={onQuantChange} max={details.available}/>
                        </span>
                        <span className="detail-cart">
                            <Button onClick={editCart}>Add to cart</Button>
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default VegetableDetail; 
