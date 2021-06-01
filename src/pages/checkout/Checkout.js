import React, {Component} from 'react';
import Item from '../../components/checkoutItem/Item';
import Dropdown from './Dropdown.js';
import OrderSummary from '../../components/orderSummary/OrderSummary';
import "./Checkout.css";
import "../../components/checkoutItem/Item.css";
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = 
            {itemListData: [], 
             checkoutList: []}
        this.onAddItem = this.onAddItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount(){
        axios.get('all-produce')
        .then((resp) => {
            this.setState({itemListData: resp.data})
        })
    }

    renderItem(i) {
        return <Item item={i}/>
    }

    renderDropDown(items, type) {
        return <Dropdown items={items} type={type}/>
    }

    
    // manipulating the item array
    onAddItem(newValue){
        this.setState({
        checkoutList: this.state.checkoutList.concat({value:newValue, quantity: 1})
      })
    }
 
    onRemoveItem(id){
        this.setState({checkoutList: this.state.checkoutList.filter(item => item.value.id !== id)
        })
            
    }
    
    onUpdateItem(id, i){
        const list = this.state.checkoutList.map(item => {
            if (item.value.id === id) {
              return {value:item.value, quantity: i};
            } else {
              return item;
            }
          })
     
        this.setState({checkoutList: list})
      }

    updateValue(id, newData, indicator){
        if (newData === 0 && indicator === "down"){
            this.onRemoveItem(id);
        }
        else 
            this.onUpdateItem(id, newData);
    }

    render () {
        const summary = this.state.checkoutList.map(item => {
            return <Item key={item.value.id} 
                        id={item.value.id}
                        item ={item.value}
                        checkout={true}
                        quantity={item.quantity}
                        onAddItem={this.onAddItem}
                        onUpdateItem={this.onUpdateItem}
                        onRemoveItem={this.onRemoveItem}
                        />
        })
        let totalvalue = 0; 
        this.state.checkoutList.forEach(val => totalvalue+=val.quantity* val.value.price);
        const dropdowns = this.state.itemListData.map( ({name, produces}) => {
            return(<Dropdown items={produces} 
                key={name}
                type={name}
                onAddItem={this.onAddItem}
                onUpdateItem={this.onUpdateItem}
                onRemoveItem={this.onRemoveItem}
                checkoutList={this.state.checkoutList}
            />)
        })

        return(
            <div>
                <div className="checkOrder">
                    {dropdowns}
                </div>
                <div >
                    <div className="orderTitle">
                        Order Summary
                        <hr className="hr"/>
                    </div> 
                    <div className="itemBig">
                        <div className="orderSummary">
                            <div className= "theadCol itemColumnRight thead">Product</div>
                            <div className= "theadCol itemColumnRight">
                                <div className= "itemColumn-small thead">Quantity</div>
                                <div className= "itemColumn-small thead">Price</div>
                            </div>
                            {summary}
                        </div>
                        <div className="orderTotal">
                            <OrderSummary total={totalvalue} cl={this.state.checkoutList} token={this.props.token} api="mm-checkout"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;

