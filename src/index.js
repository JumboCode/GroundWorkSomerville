import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import useAxios from 'axios-hooks';
import {useDropzone} from 'react-dropzone';


function InventoryItem(props) {
    return (
        <div className="inventory-item">
            {props.name}
        </div>
    );
}

function ItemTable(props) {
    // TODO: get auth information from login form
    var response = useAxios({
        url: '/list-vegetables',
        auth: {
            username: '<placeholder>',
            password: '<placeholder>',
        }
    })[0].data;

    // responses usually come back "undefined" a few times,
    // so this block handles that case
    if (response !== undefined) {
        console.log(response);

        var veggies = response.map(function(v) {
            return {name: v.name};
        });
        var items = veggies.map((item) => {
            return <InventoryItem name={item.name} />;    
        });

        return (
            <div className="inventory">
                {items}
            </div>
        );
    } else {
        return <div className='inventory' />;
    }
}

function FileUpload(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>

        </section>
    );
}


class Inventory extends React.Component {
    render() {
        return (
            <div>
                <ItemTable />
                <FileUpload />
            </div>
        );
    }
}

ReactDOM.render(
    <Inventory />,
    document.getElementById('root')
);
