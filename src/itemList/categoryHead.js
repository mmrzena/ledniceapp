import React, { Component } from 'react';

class CategoryHead extends Component {


  handleIfItemExists(){
    const arr = this.props.renderItems().map(item => item.props.categoryId);
    if(arr.includes(this.props.id)){
      return this.props.name
    }
  }



  render() {
    return (
      <div className='rendered'>
          <div  className='renderedCategory '>  
            {this.handleIfItemExists()}
          </div>
          <div className='renderedItems'>
            {this.props.renderItems().filter( item => item.props.categoryId === this.props.id)}
          </div>
      </div>
    );
  }

}

export default CategoryHead;
