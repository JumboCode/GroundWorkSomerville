// Source: https://stackoverflow.com/questions/52734086/decrement-and-increment-quantity-with-reactjs
import React, {Component} from "react";
import "./Quantity.css";

class Quantity extends Component {
    constructor(props) {
      super(props);
      this.state = {
        quantity: this.props.quantity,
        show: true,
      };
    }
  
    IncrementItem = () => {
        if(this.props.quantity < this.props.max) {
            this.props.onQuantChange(this.props.id, this.props.quantity + 1, "up");
            return {
                quantity: this.props.quantity + 1
            }
        } else {
            return null;
        }
    }

    DecreaseItem = () => {
        if(this.props.quantity > 0) {
            this.props.onQuantChange(this.props.id, this.props.quantity - 1, "down");
            return {
                quantity: this.props.quantity - 1
            }
        } else {
            return null;
        }
    }

    ToggleClick = () => {
      this.setState({
        show: !this.state.show
      });
    }
    handleChange = (event) => {
    //   this.setState({quantity: event.target.value});
        this.props.onQuantChange(event.target.value, "change");
    }
  
    render() {
  
      return (
        <div className="buttonQuant">
            <button className="button dButton" onClick = {this.DecreaseItem}>-</button>
            <input className="inputbox" value={this.props.quantity} onChange={this.handleChange}/>
            <button className="button iButton" onClick={this.IncrementItem}>+</button>
        </div>
      );
    }
  }

  
export default Quantity;