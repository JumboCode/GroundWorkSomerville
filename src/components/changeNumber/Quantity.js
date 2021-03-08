// Source: https://stackoverflow.com/questions/52734086/decrement-and-increment-quantity-with-reactjs
import React, {Component} from "react";
import "./Quantity.css";

class Quantity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quantity: this.props.quantity,
        show: true,
        max: 5,
        min: 0
      };


    }
  
    IncrementItem = () => {
        if(this.props.quantity < 9) {
            this.props.onQuantChange(this.props.id, this.props.quantity + 1, "up");
            console.log("in increment item")
            console.log(this.props.quantity)
            console.log(this.props.quantity +1)
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
            <button onClick = {this.DecreaseItem}>-</button>
            <input className="inputbox" value={this.props.quantity} onChange={this.handleChange}/>
            <button onClick={this.IncrementItem}>+</button>
        </div>
      );
    }
  }

  
export default Quantity;