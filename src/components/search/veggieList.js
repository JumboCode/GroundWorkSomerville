import React from 'react';

const VeggieList = ({veggieList=[]}) => {
  return (
    <>
    { VeggieList.map((data,index) => {
        if (data) {
          return (
            <div key={data.name}>
              <h1>{data.name}</h1>
	    </div>
    	   )
    	 }
    	 return null
    }) }
    </>
  );
}

export default VeggieList
