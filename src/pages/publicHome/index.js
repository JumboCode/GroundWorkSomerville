import React, { Component } from 'react';
import axios from 'axios';
import VegGrid from '../../components/grid/VegGrid';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import Button from '../../components/button';
import './styles.css';
import {Link} from 'react-router-dom';

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
        this.gridcol = this.gridcol.bind(this)
    };

    componentDidMount() {
        axios.get('merch-summary')
        .then((resp) => {
            this.setState({vegData:resp.data, defaultData:resp.data, searchedData:resp.data})
            this.state.vegData.forEach((dat)=>{
                this.setState({categories: this.state.categories.add(dat['category'])})
            })
        })
    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value })
    }

    search(event) {
        event.preventDefault()
        if (this.state.searchText !== ""){
            this.setState({ searched: true })
            axios.get(`search-merchandise/${this.state.searchText}`)
            .then((resp) => {
                this.setState({searchedData:resp.data, vegData:resp.data})
                this.changeCat({target:{id: this.state.currentCat}})
                this.filter({target:{id: this.state.currentFilter}})
            })
        }
    }

    clearSearch() {
        this.setState({ vegData: this.state.defaultData, searchText: "", searched: false, searchedData: this.state.defaultData})
    }

    changeCat(event){
        const id = event.target.id
        this.setState({currentCat:id})
        if (id === "bmVwYWw=") {
            this.setState({vegData:this.state.searchedData})
        } else {
            this.setState({vegData:this.state.searchedData.filter(dat => {
                return(String(dat['category']) === String(id))
            })})
        }
    }

    filter(event){
        const id = event.target.id
        this.setState({currentFilter: id})
        const merchCmpl = (a,b) => {return (a.price < b.price ? -1 : 1)}
        const merchCmpg = (a,b) => {return (a.price < b.price ? 1: -1)}
        if (id === "lh"){
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
                            <Nav.Link as="div" key={cat} id={cat} className="cat-text" onClick={this.changeCat} eventKey={cat}>{cat}</Nav.Link>
                        )
                    })}
                </Nav></Tab.Container>
                </div>
                <div className="filter-comp">
                <h2 className="filter-header">&#9776; Filter</h2>
                <Tab.Container><Nav className="flex-column">
                    {/* <Nav.Link as="div" eventKey="relevance" className="cat-text" onClick={this.filter} id="rel">relevance</Nav.Link> */}
                    <Nav.Link as="div" eventKey="lohigh" className="cat-text" onClick={this.filter} id="lh">price: low to high</Nav.Link>
                    <Nav.Link as="div" eventKey="highlo" className="cat-text" onClick={this.filter} id="hl">price: high to low</Nav.Link>
                </Nav></Tab.Container>
                </div>
            </div>
        ) 
    }

    minicart(cart){
        const getCartItem = ([name, item]) => {
            return(
                <tr key={name+"cart-row-"}><td>{name}</td> 
                <td>{item.quantity}</td>
                <td>${item.price}</td></tr>
            )
        }
        return(
            <div className="mini-cart">
                <h4 className="filter-header">My Cart: {Object.keys(cart).length} items</h4>
                <table className="mini-cart-table">
                    <tbody>
                        {Object.entries(cart).map(getCartItem)}
                    </tbody>
                </table>
                <div className="mini-checkout-center">
                <Link to="cart"><Button className="minicart-button">Checkout</Button></Link>
                </div>
            </div>
        )
    }

    gridcol() {
        const {vegData, searched, searchText} = this.state;
        const {cart, setCart} = this.props;
        const addToCart = (name, item) => { setCart({...cart, [name]: item}) }
        return(
            <div>
            <form className="home-search">
                <input type="text" onChange={this.handleSearch} placeholder="Search" value={searchText} className="home-search-text"/>
                <Button onClick={this.search}>Search</Button>
            </form>
            {searched && <div onClick={this.clearSearch} className="clear-search">Clear Search Results</div>}
            {searched && !vegData.length ?
            <div className="no-search">No results found for {searchText}</div>:
            <VegGrid vegData={vegData} addToCart={addToCart}/>}
            </div>)
    }

    render() {
        const {showCart, cart} = this.props;
        const withCart = 
            (<Container id="public-home" fluid><Row>
                <Col> {this.gridcol()} </Col>
                <Col sm={3}> {this.minicart(cart)} </Col>}
            </Row></Container>);
        const withoutCart = 
            (<Container id="public-home" fluid><Row>
                <Col sm={3}> {this.filterComp()} </Col>
                <Col> {this.gridcol()} </Col>
            </Row></Container>)
        return( showCart ? withCart : withoutCart )
    }
}

export default PublicHome;