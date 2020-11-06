//https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';//create later
import VeggieList from './VeggieList';//create later

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [veggieListDefault, setVeggieListDefault] = useState();
  const [veggieList, setVeggieList] = useState();

  //const fetchData = async () => {
    // return await fetch()//WHERE WE PUT PUR DATA BASE
    //   .then(response => response.json())
    //   .then(data => {
    //      setveggieList(data)
    //      setveggieListDefault(data)
    //    });}

  const updateInput = async (input) => {
     const filtered = veggieListDefault.filter(country => {
      return country.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setveggieList(filtered);
  }

  useEffect( () => {fetchData()},[]);

  return (
    <>
      <h1>Vegtable List</h1>
      <SearchBar
       input={input}
       onChange={updateInput}
      />
      <veggieList veggieList={veggieList}/>
    </>
   );
}

export default SearchPage
