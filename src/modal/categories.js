import React, { Component } from 'react';
import Subcategories from './subcategories.js'

class Categories extends Component {

  renderSubcategories(){
    return this.props.subcategories.map( (item, index) => <Subcategories 
    key={index} {...item} 
    handleQinModal={this.props.handleQinModal.bind(this)}
    props={this.props}
    createTask={this.props.createTask.bind(this)}
    />)
  }

  render() {
    
    return (
      
      <div className='renCatAndSub' >
          {this.props.name}
          <ul>
          {this.renderSubcategories()}

          </ul>
      </div>
    );
  }

}

export default Categories;
