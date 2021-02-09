import React from 'react';
import './VegDetail.css'

const VegetableDetail = (props) => {
    const { id } = props;
	return (
		<div id="veg-detail">
            <div className="detail-img-container">
                <img src="/media/images/default.jpg" className= "detail-img"/>
            </div>
            <div className="info-container">
                {id}
            </div>
        </div>

		);
	}

export default VegetableDetail; 
