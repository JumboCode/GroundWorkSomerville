import React, {Component} from 'react';

//https://medium.com/wesionary-team/react-functional-components-vs-class-components-86a2d2821a22

class SearchBar extends Component {
  constructor(props){
     super(props);
  }



}
 const SearchBar = ({keyword, setKeyword}) => {
   const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
   return (
     <input
      style={BarStyling}
      key="random1"
      value={keyword}
      placeholder={"search for produce"}
      onChange= {(e) =>{ setKeyword(e.target.value);}}   />
   );
 }

 export default SearchBar;