import React, {Component} from "react"; 
import Item from "../../components/checkoutItem/Item";
import "./Dropdown.css";
import "./Checkout.css";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items, 
            showList: true,
        };
    }

    toggleList = () => {
        this.setState({
          showList: !this.state.showList
        });
      }

  
    render() {
        const checkoutItems = this.props.items.map((item) => {
          let quantlist = this.props.checkoutList? this.props.checkoutList.filter(citem => citem.value.id === item.id) : null
          let quant = 0
          if (quantlist !== null){
            if (typeof(quantlist[0]) == 'undefined') {
                quant = 0
            } else {
                quant = quantlist[0].quantity;
            } 
          }

             return <Item   key={item.id}
                            id={item.id}
                            item={item}
                            checkout={false}
                            quantity={quant}
                            onAddItem={this.props.onAddItem}
                            onUpdateItem={this.props.onUpdateItem}
                            onRemoveItem={this.props.onRemoveItem}
                            />
        })
        const showList = this.state.showList;

        return(
            <div>
                <div className="title-header">
                    <div className="button-header-title">{this.props.type}</div> 
                    <button
                        type="button" 
                        className="button-header" 
                        onClick={this.toggleList}
                    >
                    {showList? "-" : "+"}
                    </button>
                    <hr className="hr"/>
                </div>
                <div className="itemBig">
                    {showList && checkoutItems}
                </div>

            </div>
         
        )
    }
}

export default Dropdown