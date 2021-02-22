import React, {Component} from "react"; 
import Item from "./Item.js";
import "./Dropdown.css";


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
        const checkoutItems = this.state.items.map(item => <Item key={item.id}
                                                                 id={item.id}
                                                                 item={item}
                                                                 onAddItem={this.props.onAddItem}
                                                                 onUpateItem={this.props.onUpateItem}
                                                                 onRemoveItem={this.props.onRemoveItem}
                                                                 />)
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
                </div>
                
                {showList && checkoutItems}

            </div>
         
        )
    }
}

export default Dropdown