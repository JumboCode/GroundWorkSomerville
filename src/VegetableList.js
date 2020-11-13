import React from 'react';
import { API_BASE } from './constants';
import useAxios from 'axios-hooks'
import { Table } from 'react-bootstrap';

// convert a vegetable object into a table row
const DisplayVegetable = (veg, i) => {
  return (
    <tr key={i}>
      <th>{i}</th>
      <th>{veg.id}</th>
      <th>{veg.name}</th>
      <th>{veg.availability ? 'Available' : 'Not Available'}</th>
      <th>{veg.categories}</th>
    </tr>
  )
}

// fetches for the 
const VegetableList = () => {
  // TODO: figure out authentication headers, right now authentication is
  // disabled for this one single route for testing.
  const [{ data, loading, error },] = useAxios(
    `${API_BASE}list-vegetables`
  )
 
  if (loading) return <p>Loading...</p>
  // TODO: test for error status code. redirect user to login page if returns 403
  if (error) return <p>`${error.message}`</p>
 
  // TODO: handle photo and prices and stuff after merge with master
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vegetable Id</th>
            <th>Name</th>
            <th>Availability</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {data.map((veg, i) => DisplayVegetable(veg, i))}
        </tbody>
      </Table>
    </div>
  )
}

export default VegetableList;