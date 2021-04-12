import React, {Component} from "react";
import Button from '../../components/button';
import { withRouter } from "react-router-dom";
import "./CartOrder.css";

class CartOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total : this.props.total
        }     
    }

    toDecimal(num){
        return num.toFixed(2);
    }

    salesTax = (value) => {
        return value*0.01.toFixed(2);
    }

    checkout(event) {
        event.preventDefault()
        this.props.history.push('/cartCheckout');
    }
    
   

    render() {
        return (
            <div className="cartContainer">
                <h2 className="header">Order Summary:</h2>
                <p><span className="leftsub">Subtotal: </span> <span className="rightsub">${this.props.total}</span> </p>
                <p><span className="leftsub">Estimated Sales Tax: </span> <span className="rightsub">${this.toDecimal(this.salesTax(this.props.total))}</span> </p>
                <hr/>
                <p><span className="leftsub">Total: </span> <span className="rightsub">${this.toDecimal(this.props.total + this.salesTax(this.props.total))}</span></p>
                <div className = "checkoutContainer"> <Button onClick={(e)=>this.props.onCheckoutChange(true)}>Checkout</Button></div>
            </div>
        )
    }
}

export default withRouter(CartOrder);

