import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class LocationMap extends Component {
    render() {
        const style = {borderRadius:'15px', width:'93%'}
        const gsLocation = { lat: 42.380829260962926, lng: -71.09798948152716 }
    
        return (
            <Map google={this.props.google} zoom={14} style={style} initialCenter={gsLocation}>
                <Marker position={gsLocation}/>
            </Map>
        );
    }
}

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyAl7rN3ikDluQh2zTnr3AWK9wNA8GS2gr8'
})(LocationMap);