import React, {useState} from "react";
import Button from '../button';
// import { withRouter } from "react-router-dom";

import "./OrderSummary.css"
import axios from "axios";

const OrderSummary = ({total, cl, token, api}) => {   
    const [orderResp, setOrderResp] = useState({})
    const [complete, setComplete] = useState(false)

    const printReceipt = () => {
      // TO-DO: Sync the new pop-up box 
      window.alert("printing receipt!");
    }

    const handleChange = () => {
        
        const dat = {items: cl.map((i) => {return {id:i.value.id, quantity:i.quantity}})}
        const header = api === "mm-checkout" ? {'Authorization': `Token ${token}`} : {}
        // this.setState({order: true})
        axios({
            method: "post",
            url: api,
            data: dat,
            headers: header,
            })
        .then(function (resp) {
            // setStat({orderNum: resp.data.receipt_number, order: true})
            setComplete(true)
            setOrderResp(resp.data)
        })
        .catch(function (response) {
            console.log(response);
        });
    }


    return(
      <div className="orderBlock">
        <p className="total">Total: {total.toFixed(2)}</p>
        {!complete && total > 1 &&
        <div className="orderAbout">
            <button className="orderButton" onClick={handleChange}>Place Order</button>
            <p className="orderMsg">Once your order is placed, we'll contact you when your produce is ready for pickup!</p>
        </div>
        }
        {complete &&  
        <div className="orderDone">
          <div className="doneButtons">
            <Button className="small-Btn" 
              onClick={printReceipt}>
                Print Receipt
            </Button>
          </div>
          <p className="orderMsg">Your order is:</p>
          <p className="orderNum">#{orderResp.receipt_number}</p>
          <p className="orderMsg">We'll contact you when your produce is ready for pickup!</p>
        </div>
        }
      </div>
    )
}

export default OrderSummary;