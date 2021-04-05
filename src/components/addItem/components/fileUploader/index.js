import React, {useState} from 'react'

const FileUploader = ({onFileSelect}) => {
    const [fileInput, setFileInput] = useState('');

    const handleFileInput = (e) => {
        // // handle validations
        // onFileSelect(e.target.files[0])
        setFileInput(e.target.files[0]);
    }

    const onFileUpload = () => {
         // Create an object of formData
        const formData = new FormData();
        
        if (fileInput) {
              // Update the formData object
            formData.append(
                "myFile",
                fileInput,
                fileInput.name
            );
            
            // Details of the uploaded file
            console.log(fileInput);
            
            // Request made to the backend api
            // Send formData object
            // axios.post("api/uploadfile", formData);
        }
        else {
            window.alert("Please choose a file first");
        }
      
    }

    return (
        <div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={onFileUpload}>
                  Upload!
                </button>
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/> */}
        </div>
        
    )
}

export default FileUploader;