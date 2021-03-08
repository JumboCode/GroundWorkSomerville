import React, {Component} from 'react';
import './Item.css';
import Quantity from '../../components/changeNumber/Quantity';
var classNames = require('classnames');


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quantity: this.props.quantity
        };
        this.onQuantChange = this.onQuantChange.bind(this);

    }

    onQuantChange(id, newData, indicator){
        this.setState({quantity : newData}, ()=>{
            if (newData === 1 && indicator === "up") {
                console.log("adding 1 item");
                this.props.onAddItem(this.props.item)
            } else if (newData === 0 && indicator === "down") {
                console.log("removing 1 item");
                this.props.onRemoveItem(this.props.id)
            } else {
                console.log("updating 1 item");
                console.log(this.props.id)
                this.props.onUpdateItem(this.props.id, newData)
            }
  
        })
    }

    toDecimal(num){
        return num.toFixed(2);
    }
    componentWillReceiveProps(nextProps){
           this.setState({quantity: nextProps.quantity})
      }


    render() {
        var itemcol = classNames({
            'itemColumn': !this.props.checkout,
            'orderColumn': this.props.checkout,
            'itemColumnRight': true,
          });

        var itemcolQuant = classNames({
            'itemColumnQuant': !this.props.checkout,
            'orderColumnQuant': this.props.checkout,
            'itemColumnRight': true,
        });

        var itemblk = classNames({
            'itemBlock': !this.props.checkout, 
            'orderBlock': this.props.checkout
        })

        var itemcontainer = classNames({
            'itemContainer': !this.props.checkout
        })

        // const quantityvar = !this.props.checkout? this.state.quantity : this.props.quantity;
        const quantityvar = this.state.quantity;

        return(
            <div className={itemcontainer}>
                <div className={itemblk}>
                    {!this.props.checkout && <div className="itemColumn-img">
                        <img src="https://image.shutterstock.com/image-illustration/simple-drawing-tree-beautiful-green-260nw-1676022487.jpg" alt="productpicture" className="prod-image"></img>
                    </div>}
                    <div className={itemcol}>
                        <p className="itemName">{this.props.item.name}</p>
                        {!this.props.checkout && <p>${this.toDecimal(this.props.item.price)}/{this.props.item.unit}</p>}
                    </div>
                    <div className={itemcolQuant}>
                        <div className="itemColumn-small small-Quant">
                            {!this.props.checkout && <p>Quantity</p>}
                            <Quantity 
                                id = {this.props.id}
                                quantity={quantityvar}
                                onQuantChange={this.onQuantChange} 
                            />
                        </div>
                        <div className="itemColumn-small small-Total">
                            {!this.props.checkout && <p>Total</p>}
                            {!this.props.checkout && this.toDecimal(quantityvar*this.props.item.price)}
                            {this.props.checkout && <p>/{this.toDecimal(quantityvar)}</p>}

                        </div>
                    </div>
                   
                </div>
            </div> 
        )
    }
    
}

export default Item