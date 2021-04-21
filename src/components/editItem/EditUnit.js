import React, {useState, useEffect} from "react";
import "./EditUnit.css";
import { Form } from 'react-bootstrap';
import FileUploader from "../fileUploader";


const EditUnit = ({id, item, sendFormData, sendImage}) => {
    const [formData, setFormData] = useState({})

    useEffect(()=>{
        sendFormData(formData)
    }, [formData])

    const addFormData = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({...formData, [key]:value})
    }

    const selectFile = (e) => {
        const value = e.target.files[0]
        sendImage(value)
    }

    return(
        <div key={id} className="unitContainer" >
            <div className="unitBlock">
                <label className="nameHeader  "> Name:
                    <input type="text" name="name"  onChange={addFormData}/>
                </label>
                <div className="leftHeader">
                <label className="smallHeader  ">
                    Price:  
                    <input type="number"
                    className="inputBox"
                    name="price"
                    onChange={addFormData}/>
                </label>
                <label className="smallHeader  ">
                    Unit:  
                    <input type="text" 
                    className="inputBox"
                    name="unit"
                    onChange={addFormData}/>
                </label>
                <label className="smallHeader  ">
                    Sold:  
                    <input type="number" 
                    className="inputBox"
                    name="sold"
                    onChange={addFormData}/>
                </label>
                <label className="smallHeader  ">
                    Available: 
                    <input type="number"
                    className="inputBox" 
                    name="available"
                    onChange={addFormData}/>
                </label>
                </div>
            </div>
            <div className="unitBlock">
                <label className="description"> Description: 
                    <textarea className="descripBox" 
                    type="text" 
                    name="description" 
                    onChange={addFormData}/>
                </label> 
                <div className="changePic">
                    <img src="https://image.shutterstock.com/image-illustration/simple-drawing-tree-beautiful-green-260nw-1676022487.jpg" alt="productpicture" className="prod-imagenew"></img>
                    <div className="formPic">
                        <div>
                            <input type="file" name="image" onChange={selectFile}/>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )

}

// class EditUnit extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: this.props.item.name, 
//             price: this.props.item.price, 
//             unit: this.props.item.unit, 
//             sold: this.props.item.sold, 
//             available: this.props.item.available, 
//             description: this.props.item.description,
//             selectedFile: null,
//             setSelectedFile: null
//         };
//     }

//     handleChange(evt) {
//         const value = evt.target.value;
//         const {addFormData} = this.props;
//         addFormData({[evt.target.name]: value})
//     };

//     onFileChange = event => {
//         // Update the state
//         this.setState({ selectedFile: event.target.files[0] });
//     };


//     render() {
//         return(
//             <div id={this.props.key} className="unitContainer" >
//                 <div className="unitBlock">
//                     <label className="nameHeader  "> Name:
//                         <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
//                     </label>
//                     <div className="leftHeader">
//                     <label className="smallHeader  ">
//                         Price:  
//                         <input type="number" 
//                         className="inputBox"
//                         name="price"
//                         value={this.state.price} onChange={e => this.handleChange(e)} />
//                     </label>
//                     <label className="smallHeader  ">
//                         Unit:  
//                         <input type="text" 
//                         className="inputBox"
//                         name="unit"
//                         value={this.state.unit} onChange={e => this.handleChange(e)} />
//                     </label>
//                     <label className="smallHeader  ">
//                         Sold:  
//                         <input type="number" 
//                         className="inputBox"
//                         name="sold"
//                         value={this.state.sold} onChange={e => this.handleChange(e)} />
//                     </label>
//                     <label className="smallHeader  ">
//                         Available: 
//                         <input type="number"
//                         className="inputBox" 
//                         name="price"
//                         value={this.state.available} onChange={this.handleChange} />
//                     </label>
//                     </div>
//                 </div>
//                 <div className="unitBlock">
//                     <label className="description"> Description: 
//                         <textarea className="descripBox" 
//                         type="text" 
//                         name="description" 
//                         value={this.state.description} onChange={e => this.handleChange(e)}/>
//                     </label> 
//                     <div className="changePic">
//                         <img src="https://image.shutterstock.com/image-illustration/simple-drawing-tree-beautiful-green-260nw-1676022487.jpg" alt="productpicture" className="prod-imagenew"></img>
//                         <div className="formPic">
//                             <div>
//                                 <input type="file" onChange={this.onFileChange} />
//                                 <button onClick={this.onFileUpload} >
//                                     Select Image
//                                 </button>
//                             </div>
//                             <button>Delete</button>
//                         </div>
//                     </div>
//                     <hr />
//                 </div>
//             </div>
//         )
//     }
// }

// Question: Why is that the input has to be string

export default EditUnit;