import React, {Component} from 'react';
import Item from './Item.js';
import checkoutData from "../../temp-data/checkoutData";
import Dropdown from './Dropdown.js';

class Checkout extends Component {
    constructor() {
        super()
        this.state = {checkoutList: checkoutData}
    }

    renderItem(i) {
        return <Item item={i}/>
    }

    renderDropDown(items, type) {
        return <Dropdown items={items} type={type}/>
    }
 

    render () {

        // let checkoutItems = this.state.checkoutList.map((item) => 
        //    { return (this.renderItem(item))});
        let category = "";
        let itemsList = [];
        let createDropdown = this.state.checkoutList.map(item => {
            console.log(item);
            if (item.type !== category) {
                console.log("in not if here");
                let tempList = [...itemsList]; 
                let tempType = category;

                itemsList = [];
                itemsList.push(item);

                category = item.type;
                console.log("creating dropdown");
                console.log(tempList);
                if (tempList.length !== 0)
                    return <Dropdown items={tempList} type={tempType}/>
                else 
                    return null;
            }
            else {
                console.log("in  if here");
                itemsList.push(item);
                return null;
            }
           
         })

        return(
            <div>
                {createDropdown}
                <Dropdown items={itemsList} type={category}/>
            </div>
        )
    }
}

export default Checkout;

