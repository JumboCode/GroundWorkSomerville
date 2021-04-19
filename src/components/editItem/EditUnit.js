import React, {Component} from "react";
import "./EditUnit.css";
import { Form } from 'react-bootstrap';
import FileUploader from "../fileUploader";

class EditUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name, 
            price: this.props.item.price, 
            unit: this.props.item.unit, 
            sold: this.props.item.sold, 
            available: this.props.item.available, 
            description: this.props.item.description,
            selectedFile: null,
            setSelectedFile: null
        };
        this.headerItems = [["Price", this.state.price, "num"], 
                            ["Unit", this.state.unit, "text" ],
                            ["Sold", this.state.sold, "num"], 
                            ["Available", this.state.available, "num"]];
    }


    handleChange(evt) {
        const value = evt.target.value;
        this.setState({[evt.target.name]: value})
    };


    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
    };

     // On file upload (click the upload button)
     onFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        if (this.state.selectedFile) {
            // Update the formData object
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            // Details of the uploaded file
            console.log(this.state.selectedFile);
        }
        else {
            window.alert("Please choose a file first");
        }
       
      
        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };

    render() {
        // const headerInput = this.headerItems.map(item => {
        //     let nameval = item[0].toLowerCase();
        //     return (
        //         <label className="smallHeader">
        //             {item[0]}:
        //             <input type={item[2]} 
        //             name={nameval}
        //             value={item[1]} onChange={e => this.handleChange(e)} />
        //         </label>
        //     )
        // })
        console.log(this.state.price);
        return(
            <div id={this.props.key} className="unitContainer" >
                <div className="unitBlock">
                    <label className="nameHeader  "> Name:
                        <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
                    </label>
                    <div className="leftHeader">
                    <label className="smallHeader  ">
                        Price:  
                        <input type="number" 
                        className="inputBox"
                        name="price"
                        value={this.state.price} onChange={e => this.handleChange(e)} />
                    </label>
                    <label className="smallHeader  ">
                        Unit:  
                        <input type="text" 
                        className="inputBox"
                        name="unit"
                        value={this.state.unit} onChange={e => this.handleChange(e)} />
                    </label>
                    <label className="smallHeader  ">
                        Sold:  
                        <input type="number" 
                        className="inputBox"
                        name="sold"
                        value={this.state.sold} onChange={e => this.handleChange(e)} />
                    </label>
                    <label className="smallHeader  ">
                        Available: 
                        <input type="number"
                        className="inputBox" 
                        name="price"
                        value={this.state.available} onChange={this.handleChange} />
                    </label>
                    </div>
                </div>
                <div className="unitBlock">
                    <label className="description"> Description: 
                        <textarea className="descripBox" 
                        type="text" 
                        name="description" 
                        value={this.state.description} onChange={e => this.handleChange(e)}/>
                    </label> 
                    <div className="changePic">
                        <img src="https://image.shutterstock.com/image-illustration/simple-drawing-tree-beautiful-green-260nw-1676022487.jpg" alt="productpicture" className="prod-imagenew"></img>
                        {/* <FileUploader
                            onFileSelectSuccess={(file) => this.state.setSelectedFile(file)}
                            onFileSelectError={({ error }) => alert(error)}
                        /> */}
                        <div className="formPic">
                            {/* <form action="/action_page.php">
                                <input className="upload" type="file" id="myFile" name="filename"/>
                            </form> */}
                            <div>
                                <input type="file" onChange={this.onFileChange} />
                                <button onClick={this.onFileUpload} >
                                    Select Image
                                </button>
                            </div>
                            <button>Delete</button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
    
}

// Question: Why is that the input has to be string

export default EditUnit;