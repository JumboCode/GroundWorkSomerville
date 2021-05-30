import React, {Component} from "react";
import Button from '../button';
import { withRouter } from "react-router-dom";

import "./OrderSummary.css"
import axios from "axios";

class OrderSummary extends Component{    
    constructor(props) {
        super(props);
        this.state = {
          order: this.props.order, 
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
        const dat = {items: [this.props.cl.map((i) => {return {id:i.value.id, quantity:i.quantity}})]}
        console.log(dat)
        axios({
            method: "post",
            url: "mm-checkout",
            data: dat,
            headers: {'Authorization': `Token ${this.props.token}`},
            })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
      // this.setState({order: true});
        // this.setState({orderNum: this.getRandomInt()})
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