import React, {Component} from "react";
import itemData from "../../temp-data/cartData";
import Item from "../../components/checkoutItem/Item"
import OrderSummary from "../../components/orderSummary/OrderSummary"
// import { Modal, Tab, Nav } from 'react-bootstrap';
import CartOrder from "./CartOrder"
import "./PublicCart.css"

class PublicCart extends Component {
    constructor(props) {
        super(props)
        this.onCheckoutChange = this.onCheckoutChange.bind(this);

        this.state = {
            checkout: false
        }
    }

    onCheckoutChange(newData){
        this.setState({checkout : newData}, ()=>{
        })
    }

    render() {

        let total = 0;
        let cartItems = itemData.map( item => {
            total+= item.price * item.quantity;
            return <Item key={item.id}
                         item={item}
                         quantity={item.quantity}
                         checkout={false}/>
            }
        )

        const getRow = (dat) => {
            const style = { color: "grey", cursor: "pointer" }
            return(
                <tr key={dat.name}>
                    <td>{dat.name}</td>
                    <td>{dat.quantity}</td>
                    <td>${dat.price}</td>
                    <td>${dat.price * dat.quantity}</td>
                </tr>
            )
        }
    
        const getTable = (items) => {
            return(
                <div className="fixedHeader">
                    <table className="inventory-table">
                        <thead>
                            <tr><th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th></tr>
                        </thead>
                        <tbody>{items.map(getRow)}</tbody>
                    </table>
                </div>
            )
        } 
        return (
            <div>                    
                {!this.state.checkout && 
                <div>
                 <div className="cartHeading"><h2 className="heading">My Cart: {itemData.length} items</h2></div>
                    <div className="body">
                        <div className="cartSection">
                            <div className="listItems">{cartItems}</div> 
                        </div>
                        <div className="orderSection"><CartOrder total={total} onCheckoutChange={this.onCheckoutChange}/></div>
                    </div> 
                </div>
                }

                {this.state.checkout && 
                <div>
                     <div className="cartHeading"><h2 className="heading">Order Summary:</h2></div>
                     <div className="body">
                        <div className="cartSection">
                            <div className="listItems">{getTable(itemData)}</div> 
                        </div>
                        <div className="orderSection"><OrderSummary total={total} order={true}/></div>
                    </div> 
                </div>}
            </div>
        )
    }
}

export default PublicCart; 
