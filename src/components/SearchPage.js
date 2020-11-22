//https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d
 import React, { useState, useEffect } from 'react';
 import SearchBar from './searchBar';//create later
 import VeggieList from './veggieList';//create later

 const SearchPage = (props) => {
   const [input, setInput] = useState('');
   const [veggieListDefault, setVeggieListDefault] = useState();
   const [veggieList, setveggieList] = useState();

   const fetchData = async () => {
     return await fetch('${APIURL}/list-vegetables')//WHERE WE PUT PUR DATA BASE
       .then(response => response.json())
       .then(data => {
          setveggieList(data)
          setVeggieListDefault(data)
        });}

   const updateInput = async (input) => {
      const filtered = veggieListDefault.filter(country => {
       return country.name.toLowerCase().includes(input.toLowerCase())
      })
      setInput(input);
      setveggieList(filtered);
   }

   useEffect( () => {fetchData()},[]);

   return (
     <div class="searchPage">
      <h1>Vegtable List</h1>
         <SearchBar
          input={input}
          setKeyword={this.updateInput}
         />
         <veggieList veggieList={veggieList}/>
       </div>
      );
   }

export default SearchPage;