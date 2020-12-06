import React, {Component} from 'react';
import Timeline from './Timeline';
import PickupLocation from './PickupLocation';

class InfoPage extends Component {
	render () {
		return (
			<div className="page-container">
			<Timeline/>
			<PickupLocation/>
			</div>
		);
	}
}

export default InfoPage;