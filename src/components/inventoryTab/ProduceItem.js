import React,  {Component} from "react";
import "./ProduceItem.css";

class ProduceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return (
        <div className="prodcontainer"> 
            <div className="imgContainer">
                <img src="https://image.shutterstock.com/image-illustration/simple-drawing-tree-beautiful-green-260nw-1676022487.jpg" alt="productpicture" className="prod-image"></img>
            </div>
            <div className="rhsContainer">
                <p className="label">{this.props.item.name} </p>
                <p className="label">${this.props.item.price} /{this.props.item.unit}</p>
                <a className="label" onClick={()=> {this.props.setShowAddItem(true); this.props.setPopUpId(this.props.item.id);} }>edit</a> 
            </div>
        </div>
        )
    }
}

export default ProduceItem