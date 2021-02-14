import React from 'react';
import './VegDetail.css'
import ph from './spinach_img.jpeg';

const VegetableDetail = (props) => {
    const { id } = props;
	return (
		<div id="popup-box"> 
            <div id="popup-imgs">
                <img src={ph} alt="Picture of Vegetable"></img>
            </div>
            <div id="popup-info">
                <div id="popup-vegname">
                    Spinach
                </div>
                <button id="x-button">X</button>
                <div id="popup-tags"> 
                    <div class="popup-tag">seasonal</div>
                    <div class="popup-tag">vegetables</div>
                </div>
                <div id="popup-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div id="popup-price">
                    $5.29 / ea (= $3/lb.)
                </div>
                <div id="popup-qty">
                    quantity available: 17
                </div>
                <div id="popup-amt">
                    [box] lbs
                </div>
                <button id="popup-addtocart"> 
                    + add to cart
                </button>
            </div>
        </div>
		);
	}

export default VegetableDetail; 
