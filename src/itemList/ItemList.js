import React, { Component } from 'react';
import Item from './item';
import CategoryHead from './categoryHead.js';

class ItemList extends Component {
 
  renderItems() {
    
      return this.props.items
        .filter( item =>
          item.subcategoryName.toLowerCase().includes(
          this.props.filterString.toLowerCase()))
        .map( (item, index) => 

          <Item 
          categoryName={this.props.category}
          delItem={this.props.delItem}
          editUpQ={this.props.editUpQ}
          editDownQ={this.props.editDownQ}
          key={index} {...item}
          />
      
        )
        
  }

    renderHeaders(){
      const newItems = [... new Set(this.props.items.map( item => item.categoryId))];
      return this.props.category.filter( category => newItems.includes(category.id))
            .map( (item, index) =>
              <CategoryHead
              renderItems={this.renderItems.bind(this)}
              key={index} 
              {...item}
              />
              ) 
    }
  
  
  render() {
    if( this.props.items.length === 0){
      return (
        <span className='noFood'>
          You have no food in the fridge :( 
        </span>
      )
    } else if(this.renderItems().length === 0) {
      return (
        <span className='noFood'>
            your mom is so fat that she ate all the food you are searching for
        </span>
      )
    } else {
      return ( 
        <div className='listDiv'>
          {this.renderHeaders()}
        </div>
        );
    }
    
  }
}

export default ItemList;
