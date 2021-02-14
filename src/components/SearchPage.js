import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';//create later

const SearchPage = (props) => {
	const [input, setInput] = useState();
	const [filteredVegetables, setfilteredVegetables] = useState();
	const [allVegetables, setallVegetables] = useState();

	const fetchData = async () => {
		await fetch("list-vegetables")
			.then(response => response.json())
			.then(data => {
				//perform any operation on data required
				setallVegetables(data)
				setfilteredVegetables(data) //when nothing is searched, show all the elements
			});
		}
	
	
	const updateInput = async (input) => {
		// call backend to fill the filtered array with the list of elements that matches the input
		const filtered = []
		
		setInput(input);
		setfilteredVegetables(filtered);}

	useEffect( () => {fetchData()},[]);

	return (
		<div className = "searchPage">
		<h1>Vegetable List</h1>
				<SearchBar setKeyword={updateInput} />
				
			</div>
		);
	}

export default SearchPage;