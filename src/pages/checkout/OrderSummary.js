import React, {Component} from "react";
import "./OrderSummary.css"

class OrderSummary extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render () {
        return(
          <div>
            <p className="total">Total: {this.props.total}</p>
            <button>Place Order</button>
          </div>
          
        )
    }
}

export default OrderSummary;