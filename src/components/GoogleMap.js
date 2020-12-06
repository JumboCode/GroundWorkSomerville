import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const styleMap = {
	width: '550px',
	height: '420px'
};

export class LocationMap extends Component {
	render() {
		return (
			<Map
		        google={this.props.google}
		        zoom={14}
		        style={styleMap}
		        initialCenter={
		          {
		            lat: 42.4045408,
		            lng: -71.1197752
		          }
		        }
     		/>
		);
	}
}

export default GoogleApiWrapper ({
	apiKey: 'AIzaSyAl7rN3ikDluQh2zTnr3AWK9wNA8GS2gr8'
})(LocationMap);