import React, {Component} from 'react';
import Item from './Item.js';
import itemData from "../../temp-data/checkoutData";
import Dropdown from './Dropdown.js';

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = 
            {itemListData: itemData, 
             checkoutList: []}
        this.onAddItem = this.onAddItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);    

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
        checkoutList: this.state.checkoutList.concat(newValue)
      })
    }
 
    onRemoveItem(id){
        this.setState({checkoutList: this.state.checkoutList.filter(item => item.id !== id)
        })
            
    }
    
    onUpdateItem(id, i){
        const list = this.state.checkoutList.map((item) => {
            if (item.id === id) {
              return item.price + 1;
            } else {
              return item;
            }
          });
     
        this.setState({checkoutList: list})
      }

    render () {

        // let checkoutItems = this.state.checkoutList.map((item) => 
        //    { return (this.renderItem(item))});
        let category = "";
        let itemsList = [];
        let createDropdown = this.state.itemListData.map(item => {
            if (item.type !== category) {
                let tempList = [...itemsList]; 
                let tempType = category;

                itemsList = [];
                itemsList.push(item);

                category = item.type;
                if (tempList.length !== 0)
                    return <Dropdown 
                                items={tempList}
                                type={tempType}
                                onAddItem={this.onAddItem}
                                onUpateItem={this.onUpdateItem}
                                onRemoveItem={this.onRemoveItem}
                                />
                else 
                    return null;
            }
            else {
                itemsList.push(item);
                return null;
            }
           
         })

         let summary = this.state.checkoutList.map(item => {
             console.log("here")
             return <Item key={item.id} item ={item}/>
         })

        return(
            <div>
                <div className="checkOrder">
                    {createDropdown}
                    <Dropdown items={itemsList} type={category}/>
                </div>
                <div>
                    {summary}
                </div>

            </div>

        )
    }
}

export default Checkout;

