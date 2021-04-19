import React, {Component} from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from '../button';
import { withRouter } from "react-router-dom";

// import Popup fr

import "./OrderSummary.css"

class OrderSummary extends Component{    
    constructor(props) {
        super(props);
        this.state = {
          order: this.props.order? this.props.order : false, 
          orderNum: null
        };

        this.returnHome = this.returnHome.bind(this);

    }

    getRandomInt() {
      return Math.floor(Math.random() * 100);
    }

    returnHome(event) {
      event.preventDefault()
      this.props.history.push('/');
    }

    printReceipt() {
      // TO-DO: Sync the new pop-up box 
      window.alert("printing receipt!");
    }

    handleChange = () => {
        this.setState({order: true});
        this.setState({orderNum: this.getRandomInt()})
    }


    render () {
        return(
          <div className="orderBlock">
            <p className="total">Total: {this.props.total.toFixed(2)}</p>
            {!this.state.order && this.props.total > 1 &&
            <div className="orderAbout">
                <button className="orderButton" onClick={this.handleChange}>Place Order</button>
                <p className="orderMsg">Once your order is placed, we'll contact you when your produce is ready for pickup!</p>
            </div>
            }
            {this.state.order &&  
            <div className="orderDone">
              <div className="doneButtons">
                <Button className="small-Btn" 
                  onClick={this.printReceipt}>
                    Print Receipt
                </Button>
                <Button className="small-Btn" 
                  onClick={this.returnHome}>
                    Return to Market
                </Button>
              </div>
              <p className="orderMsg">Your order is:</p>
              <p className="orderNum">#{this.state.orderNum? this.state.orderNum : this.getRandomInt()}</p>
              <p className="orderMsg">We'll contact you when your produce is ready for pickup!</p>
            </div>
            }
            
          </div>
          
        )
    }
}

export default withRouter(OrderSummary);