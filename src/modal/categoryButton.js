import React, { Component } from 'react';
import Categories from './categories.js'

class CategoryButton extends Component {


    renderCategories() {
        console.log('lol ', this.props.category)
        return this.props.category
               .map( category => 
                <Categories {...category} key={category.id} 
                createTask={this.props.createTask.bind(this)}
                handleQinModal={this.props.handleQinModal.bind(this)}
                />
               )
    }

    renderDiv(){
        if(this.props.openModal){
            return (
                
                <div className="openModal">
                   
                    <div className="contentModal">
                    <button className='closeModal' onClick={this.props.changeOpenModal.bind(this)}>
                    X
                   </button>
                    {this.renderCategories()}
                    </div>
                </div>
            )
        }
    }


  render() {
    return (
        <div>
            <button className='openModalButton' onClick={this.props.changeOpenModal.bind(this)}>
            +
            </button>
            {this.renderDiv()}
        </div>
    );
  }

}

export default CategoryButton;
