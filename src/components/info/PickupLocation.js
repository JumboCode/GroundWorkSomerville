import React from 'react';
import LocationMap from './GoogleMap';

const  PickupLocation = (props) => {
	return (
		<div className="pickup-container">
			<div className="pickup-child">
				<h1>Pickup Location: Groundworks Somerville</h1>
				<p>337 Somerville Ave #2B Somerville, MA 02143</p>
				<p>Pickup hours: 9am - 5pm, Mon - Fri</p>
			</div>
			<div className="pickup-child">
				<LocationMap/>
			</div>
		</div>
	);
}

export default PickupLocation;