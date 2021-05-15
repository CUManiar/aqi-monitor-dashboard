import React from 'react'

const LoaderStatus = props => {
  if(props.connectionError) {
    return (
      <div className='is-medium'>
        <span className='has-text-danger' >Server sent no data. Probably the market is closed at the moment. </span>
        <br />(Come back later? :-))
      </div>
    );
  } else {
    return (
      <div className='tag is-large is-success'>
        <span className='loader'> &nbsp;</span>
        &nbsp; &nbsp; Fetching the city data...
      </div>
    );
  }
}

export default LoaderStatus;