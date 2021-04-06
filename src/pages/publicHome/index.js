import React, { Component } from 'react';
import axios from 'axios';
import VegGrid from '../../components/grid/VegGrid';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../components/button';
import './styles.css';

class PublicHome extends Component {
    constructor(props) {
        super(props);
        this.state = {vegData: [], searchText: "", searched: false};
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.getAllVegList = this.getAllVegList.bind(this)
        this.filterComp = this.filterComp.bind(this)
    };

    componentDidMount() {
        axios.get('list-vegetables')
        .then((resp) => {
            this.setState({vegData:resp.data})
        })
    }

    getAllVegList() {
        axios.get('list-vegetables')
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
        axios.get(`search-vegetables/${this.state.searchText}`)
        .then((resp) => {
            this.setState({vegData:resp.data})
        })
    }

    clearSearch() {
        this.getAllVegList()
        this.setState({ searched: false, searchText: ""})
    }

    filterComp(){
        return(
            <div className="home-filter">
                <h2 className="filter-header">Categories</h2>
                <h3 className="home-text">all merchandise</h3>
            </div>
        ) 
    }

    render() {
        const {vegData, searched, searchText} = this.state;
        return (
            <Container id="public-home" fluid><Row>
                <Col sm={3}>
                    {this.filterComp()}
                </Col>
                <Col>
                    <form class="home-search">
                        <input type="text" onChange={this.handleSearch} placeholder="Search" value={searchText} className="home-search-text"/>
                        <Button onClick={this.search}>Search</Button>
                    </form>
                    {searched && <div onClick={this.clearSearch} className="clear-search">Clear Search Results</div>}
                    <VegGrid vegData={vegData}/>
                </Col>
            </Row></Container>
        );
    }
}

export default PublicHome;