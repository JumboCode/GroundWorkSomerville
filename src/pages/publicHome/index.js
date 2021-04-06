import React, { Component } from 'react';
import axios from 'axios';
import VegGrid from '../../components/grid/VegGrid';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../components/button';
import './styles.css';

class PublicHome extends Component {
    constructor(props) {
        super(props);
        this.state = {defaultData:[], vegData: [], searchText: "", searched: false, categories:new Set()};
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.filterComp = this.filterComp.bind(this)
        this.changeCat = this.changeCat.bind(this)
    };

    componentDidMount() {
        axios.get('list-vegetables')
        .then((resp) => {
            this.setState({vegData:resp.data, defaultData:resp.data})
            this.state.vegData.map((dat)=>{
                this.setState({categories: this.state.categories.add(...dat['categories'])})
            })
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
        this.setState({ vegData: this.state.defaultData, searchText: "", searched: false})
    }

    changeCat(event){
        const id = event.target.id
        if (id == "bmVwYWw=") {
            this.setState({vegData:this.state.defaultData})
        } else {
            this.setState({vegData:this.state.defaultData.filter(dat => {
                return(dat['categories'].includes(id))
            })})
        }
    }

    filterComp(){
        const cats = Array.from(this.state.categories)
        return(
            <div className="home-filter">
                <h2 className="filter-header">Categories</h2>
                <h5 className="cat-text" onClick={this.changeCat} id="bmVwYWw=">all merchandise</h5>
                {cats.map((cat) => {
                    return(
                        <h5 key={cat} id={cat} className="cat-text" onClick={this.changeCat}>{cat}</h5>
                    )
                })}
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
                    <form className="home-search">
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