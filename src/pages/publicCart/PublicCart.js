import React, {Component} from "react";
import Item from "../../components/checkoutItem/Item"
import OrderSummary from "../../components/orderSummary/OrderSummary"
import CartOrder from "./CartOrder"
import "./PublicCart.css"

class PublicCart extends Component {
    constructor(props) {
        super(props)
        this.onCheckoutChange = this.onCheckoutChange.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.state = {
            checkout: false
        }
    }

    onCheckoutChange(newData){
        this.setState({checkout : newData}, ()=>{
        })
    }

    onChangeItem(a, b){}

    render() {
        const {cart} = this.props;
        let total = 0;
        const cartItems = Object.entries(cart).map( ([name, item]) => {
            total+= item.price * item.quantity;
            return <Item key={name}
                         item={{...item, name:name}}
                         quantity={item.quantity}
                         checkout={false}
                         available={item.available}
                         onAddItem={this.onChangeItem}
                         onUpdateItem={this.onChangeItem}
                         onRemoveItem={this.onChangeItem}/>
            }
        )

        const getRow = ([name, dat]) => {
            return(
                <tr key={name}>
                    <td>{name}</td>
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
                        <tbody>{Object.entries(items).map(getRow)}</tbody>
                    </table>
                </div>
            )
        } 
        return (
            <div>                    
                {!this.state.checkout && 
                <div>
                 <div className="cartHeading"><h2 className="heading">My Cart: {Object.keys(cart).length} items</h2></div>
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
                            <div className="listItems">{getTable(cart)}</div> 
                        </div>
                        <div className="orderSection"><OrderSummary total={total} order={true} cl={Object.values(cart)} api={"public-checkout"}/></div>
                    </div> 
                </div>}
            </div>
        )
    }
}

export default PublicCart; 
