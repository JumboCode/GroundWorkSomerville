import React from 'react';
import './InfoPage.css';
import phone from './phone.png';
import LocationMap from './GoogleMap';

const InfoPage = () => {
    return (
        <div className="Info">
            <div className="info-title"><h1><strong>How it works:</strong></h1></div>
            <div className="purchase-steps">
                <div className="line"></div>
                <div className="step-texts">
                    <div className="sr-step">
                        <div className="circle"><div className="in-circle"></div></div>
                        <span>1. Add desired items to cart</span>
                    </div>
                    <div className="sr-step">
                        <div className="circle"><div className="in-circle"></div></div>
                        <span>2. Order & check out</span>
                    </div>
                    <div className="sr-step">
                        <div className="circle"><div className="in-circle"></div></div>
                        <span>3. Pick up your items at Groundworks Somerville</span>
                    </div>
                </div>
            </div>

            <div className="location">
                <div className="row">
                    <div className="col-md address-text">
                    <h2><strong> Pickup Location:<br/>
                    Groundwork Somerville </strong></h2><br/>

                    <h4><em>337 Somerville Ave #2B<br/>
                    Somerville, MA 02143</em></h4><br/>

                    <h5>Pickup hours: <strong>9am - 5pm, Mon - Fri</strong><br/><br/>
                    <a href="tel:6176289988"><img src={phone} alt="Call us" style={{height:30}}/></a>
                    +1 617 628-9988</h5><br/>

                    </div>
                    <div className="col-md google-map">
                        <LocationMap/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;