import React, {useState, useEffect} from "react";
import "./EditUnit.css";

const EditUnit = ({id, item, sendFormData, sendImage}) => {
    const [formData, setFormData] = useState({})

    useEffect(()=>{
        sendFormData(formData)
    }, [formData, sendFormData])

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

export default EditUnit;