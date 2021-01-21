import React, { Component } from 'react';
import axios from 'axios';
import {API_BASE} from '../constants';
import VegGrid from './VegGrid';

class Vegetables extends Component {
    constructor(props) {
        super(props);
        this.state = {vegData: [], searchText: "", searched: false};
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.getAllVegList = this.getAllVegList.bind(this)
    };

    componentDidMount() {
        axios.get(`${API_BASE}list-vegetables`)
        .then((resp) => {
            this.setState({vegData:resp.data})
        })
    }

    getAllVegList() {
        axios.get(`${API_BASE}list-vegetables`)
        .then((resp) => {
            this.setState({vegData:resp.data})
        })
    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value })
    }

    search(event) {
        event.preventDefault()
        this.setState({ searched: true })
        axios.get(`${API_BASE}search-vegetables/${this.state.searchText}`)
        .then((resp) => {
            this.setState({vegData:resp.data})
        })
    }

    clearSearch() {
        this.getAllVegList()
        this.setState({ searched: false, searchText: ""})
    }

    render() {
        const {vegData, searched, searchText} = this.state;
        return (
            <div>
                <form>
                    <input type="text" onChange={this.handleSearch} placeholder="Search" value={searchText}/>
                    <button onClick={this.search}>Search</button>
                </form>
                {searched && <span onClick={this.clearSearch}>Clear Search Results</span>}
                <VegGrid vegData={vegData}/>
            </div>
        );
    }
}

export default Vegetables;