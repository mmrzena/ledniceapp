import React, { Component } from 'react';

class MissingItems extends Component {

  render() {
    
    return (
         <li>
             {this.props.item}
        </li>
    );
  }

}

export default MissingItems;
