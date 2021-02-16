import React, {Component} from 'react';
import Item from './Item.js';
import checkoutData from "../../temp-data/checkoutData";

class Checkout extends Component {
    constructor() {
        super()
        this.state = {checkoutList: checkoutData}
    }

    renderItem(i) {
        return <Item item={i}/>
    }
 

    render () {
        const checkoutItems = this.state.checkoutList.map(item => <Item key={item.id} item={item}/>)

        // let checkoutItems = this.state.checkoutList.map((item) => 
        //    { return (this.renderItem(item))});
        
        return(
            <div>
                {checkoutItems}

            </div>

        )
    }
}

export default Checkout;