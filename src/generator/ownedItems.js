import React, { Component } from 'react';
import OwnedItemsQ from './ownedItemsQ.js'

class OwnedItems extends Component {

  render() {
    
    return (
        <li>
        {this.props.subcategoryName}
        <OwnedItemsQ q={this.props.q}/>
        </li>
    );
  }

}

export default OwnedItems;
