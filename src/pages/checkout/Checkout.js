import React, {Component} from 'react';
import Item from '../../components/checkoutItem/Item';
import itemData from "../../temp-data/checkoutData";
import Dropdown from './Dropdown.js';
import OrderSummary from '../../components/orderSummary/OrderSummary';
import "./Checkout.css";
import "../../components/checkoutItem/Item.css";

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = 
            {itemListData: itemData, 
             checkoutList: []}
        this.onAddItem = this.onAddItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.updateValue = this.updateValue.bind(this);
        

    }

    renderItem(i) {
        return <Item item={i}/>
    }

    renderDropDown(items, type) {
        return <Dropdown items={items} type={type}/>
    }

    

    // onQuantChange(newData, indicator){
    //     this.setState({quantity : newData}, ()=>{
    //         if (!this.props.checkout) {
    //             if (newData === 1 && indicator === "up") {
    //                 // console.log("adding 1 item");
    //                 this.props.onAddItem(this.props.item)
    //             } else if (newData === 0 && indicator === "down") {
    //                 // console.log("removing 1 item");
    //                 this.props.onRemoveItem(this.props.id)
    //             } else {
    //                 // console.log("updating 1 item");
    //                 this.props.onUpdateItem(this.props.id, newData)
    //             }
    //         }
           
    //     //   console.log('Data 1 changed by Sidebar')
    //     //   console.log(newData)
    //     })
    // }

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
        console.log("in update item CALL")
        const list = this.state.checkoutList.map(item => {
            if (item.value.id === id) {
              return {value:item.value, quantity: i};
            } else {
              return item;
            }
          })
     
        this.setState({checkoutList: list})
        console.log(list);
      }

    updateValue(id, newData, indicator){
        if (newData === 0 && indicator === "down"){
            this.onRemoveItem(id);
        }
        else 
            this.onUpdateItem(id, newData);
    }

    render () {

        let category = "";
        let itemsList = [];
        let createDropdown = this.state.itemListData.map(item => {
            if (item.type !== category) {
                let tempList = [...itemsList]; 
                let tempType = category;

                itemsList = [];
                itemsList.push(item);

                category = item.type;
                if (tempList.length !== 0){
                    console.log("this is checkoutlist")
                    console.log(this.state.checkoutList)
                    return <Dropdown 
                                items={tempList}
                                type={tempType}
                                onAddItem={this.onAddItem}
                                onUpdateItem={this.onUpdateItem}
                                onRemoveItem={this.onRemoveItem}
                                checkoutList={this.state.checkoutList}
                                />
                }else 
                    return null;
            }
            else {
                itemsList.push(item);
                return null;
            }
           
         })

         let summary = this.state.checkoutList.map(item => {
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

        return(
            <div>
                <div className="checkOrder">
                    {createDropdown}
                    <Dropdown items={itemsList} 
                              type={category}
                              onAddItem={this.onAddItem}
                              onUpdateItem={this.onUpdateItem}
                              onRemoveItem={this.onRemoveItem}
                              checkoutList={this.state.checkoutList}
                              />
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
                            <OrderSummary total={totalvalue} />
                        </div>
                    </div>
                    
                </div>

            </div>

        )
    }
}

export default Checkout;

