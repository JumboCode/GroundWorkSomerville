import React from 'react';

const  PickupLocation = (props) => {
	return (
		<div className="pickup-component-box">
			<div className="pickup-info">
				<h1>Pickup Location: Groundworks Somerville</h1>
				<p>337 Somerville Ave #2B Somerville, MA 02143</p>
				<p>Pickup hours: 9am - 5pm, Mon - Fri</p>
			</div>
			<div className="pickup-map">
			</div>
		</div>
	);
}

export default PickupLocation;