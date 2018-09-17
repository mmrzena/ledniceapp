import React, { Component } from 'react';

class OwnedItemsQ extends Component {

  render() {
    
    return (
        <span className='ownedItemQ'>
            {this.props.q}x
        </span>
    );
  }

}

export default OwnedItemsQ;
