import { Dropdown } from 'react-bootstrap';
import React from 'react';

const Units = () => {
    return (
        <div>
            <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-small">
                Units
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                <Dropdown.Item href="#/action-3">4</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Units