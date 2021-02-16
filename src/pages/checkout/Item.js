import React, {Component} from 'react';
import './Item.css';
import Quantity from '../../components/changeNumber/Quantity';

// class Item extends Component() {
//     constructor(props) {
//         super(props);
//         this.state = { name: props.name}
//     }
//     // console.log("in item");
//     // console.log("props.name");
//     render() {
//         return(
//             <div className="item-box">
//                 <img src="../temp-data/placeholder.png" alt="placeholder" className="prod-image"></img>
//                 {this.state.name}
//                 {/* {this.props.price} */}
//             </div> 
//         )
//     }

// }

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
          quantity: 0,
        };
        this.onQuantChange = this.onQuantChange.bind(this);
    }

    onQuantChange(newData){
        this.setState({quantity : newData}, ()=>{
          console.log('Data 1 changed by Sidebar');
        })
      }
    
    toDecimal(num){
        return num.toFixed(2);
    }
    render() {
        return(
            <div className="itemContainer">
                <div className="itemBlock">
                    <img src='https://www.healthylifestylesliving.com/wp-content/uploads/2015/12/placeholder-256x256.gif' alt="placeholder" className="prod-image" />
                    <div className="itemColumn itemColumnRight">
                        <p className="itemName">{this.props.item.name}</p>
                        <p>${this.toDecimal(this.props.item.price)}/{this.props.item.unit}</p>
                    </div>
                    <div className="itemColumn itemColumnRight">
                        <div className="itemColumn-small">
                            <p>Quantity</p>
                            <Quantity 
                                quantity={this.state.quantity}
                                onQuantChange={this.onQuantChange}    
                            />
                        </div>
                        <div className="itemColumn-small">
                            <p>Total</p>
                            {this.toDecimal(this.state.quantity*this.props.item.price)}
                        </div>
                    </div>
                   
                </div>
            </div> 
        )
    }
    
}

export default Item