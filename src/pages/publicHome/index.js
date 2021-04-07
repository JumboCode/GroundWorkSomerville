import React, { Component } from 'react';
import axios from 'axios';
import VegGrid from '../../components/grid/VegGrid';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import Button from '../../components/button';
import './styles.css';

class PublicHome extends Component {
    constructor(props) {
        super(props);
        this.state = {defaultData:[],
                      searchedData: [],
                      vegData: [], 
                      searchText: "",
                      searched: false,
                      categories:new Set(),
                      currentCat:"bmVwYWw=",
                      currentFilter: "rel"};
        this.handleSearch = this.handleSearch.bind(this)
        this.search = this.search.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.filterComp = this.filterComp.bind(this)
        this.changeCat = this.changeCat.bind(this)
        this.filter = this.filter.bind(this)
        this.minicart = this.minicart.bind(this)
    };

    componentDidMount() {
        axios.get('list-vegetables')
        .then((resp) => {
            this.setState({vegData:resp.data, defaultData:resp.data, searchedData:resp.data})
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
            this.setState({searchedData:resp.data, vegData:resp.data})
            this.changeCat({target:{id: this.state.currentCat}})
            this.filter({target:{id: this.state.currentFilter}})
        })
        
    }

    clearSearch() {
        this.setState({ vegData: this.state.defaultData, searchText: "", searched: false, searchedData: this.state.defaultData})
    }

    changeCat(event){
        const id = event.target.id
        this.setState({currentCat:id})
        if (id == "bmVwYWw=") {
            this.setState({vegData:this.state.searchedData})
        } else {
            this.setState({vegData:this.state.searchedData.filter(dat => {
                return(dat['categories'].includes(id))
            })})
        }
    }

    filter(event){
        const id = event.target.id
        this.setState({currentFilter: id})
        const merchCmpl = (a,b) => {return (a.id < b.id ? -1 : 1)}
        const merchCmpg = (a,b) => {return (a.id < b.id ? 1: -1)}
        if (id == "rel"){
            this.setState({vegData: this.state.searchedData})
        } else if (id == "lh"){
            this.setState({vegData: this.state.vegData.sort(merchCmpl)})
        } else {
            this.setState({vegData: this.state.vegData.sort(merchCmpg)})
        }
    }

    filterComp(){
        const cats = Array.from(this.state.categories)
        return(
            <div className="home-filter">
                <div className="filter-comp">
                <h2 className="filter-header">Categories</h2>
                <Tab.Container defaultActiveKey="bmVwYWw="><Nav className="flex-column">
                    <Nav.Link as = "div" className="cat-text" onClick={this.changeCat} id="bmVwYWw=" eventKey="bmVwYWw=">all merchandise</Nav.Link>
                    {cats.map((cat) => {
                        return(
                            <Nav.Link as="div" key={cat} id={cat} className="cat-text" onClick={this.changeCat} eventKey={cat}>{cat == "1" ? "apparel":"miscellaneous"}</Nav.Link>
                        )
                    })}
                </Nav></Tab.Container>
                </div>
                <div className="filter-comp">
                <h2 className="filter-header">&#9776; Filter</h2>
                <Tab.Container defaultActiveKey="relevance"><Nav className="flex-column">
                    <Nav.Link as="div" eventKey="relevance" className="cat-text" onClick={this.filter} id="rel">relevance</Nav.Link>
                    <Nav.Link as="div" eventKey="lohigh" className="cat-text" onClick={this.filter} id="lh">price: low to high</Nav.Link>
                    <Nav.Link as="div" eventKey="highlo" className="cat-text" onClick={this.filter} id="hl">price: high to low</Nav.Link>
                </Nav></Tab.Container>
                </div>
            </div>
        ) 
    }

    minicart(){
        return(
            <div className="mini-cart">
                {/* TODO: get number of items in cart */}
                <h4 className="filter-header">My Cart: 4 items</h4>
                <div className="mini-checkout-center">
                {/* TODO: get items in cart */}
                <Button className="mini-checkout-button">Checkout</Button>
                </div>
            </div>
        )
    }

    render() {
        const {showCart} = this.props;
        const {vegData, searched, searchText} = this.state;
        if (showCart){
        return (
            <Container id="public-home" fluid><Row>
                <Col>
                    <form className="home-search">
                        <input type="text" onChange={this.handleSearch} placeholder="Search" value={searchText} className="home-search-text"/>
                        <Button onClick={this.search}>Search</Button>
                    </form>
                    {searched && <div onClick={this.clearSearch} className="clear-search">Clear Search Results</div>}
                    <VegGrid vegData={vegData}/>
                </Col>
                <Col sm={3}>
                    {this.minicart()}
                </Col>
            </Row></Container>
        )
        } else {
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
        )}
    }
}

export default PublicHome;