import React, { Component } from 'react';



class Item extends Component {
    constructor(){
        super()

        this.state = {
            class: ''
        }
    }

    componentDidMount(){
        let classCategory = this.props.categoryName.filter(category => category.id === this.props.categoryId)[0].name.toLowerCase().replace(/\s+/g, '')
        this.setState({class: classCategory});
    }

  render() {
    return (
        
        <ul ref='item' className={this.state.class + ' animated bounceIn'} >

            <li className='itemSubcategory'>
                {this.props.subcategoryName}
            </li>

            <li className = "itemQuantity">

              {this.props.q}x

            <button className='upButton' onClick={this.props.editUpQ.bind(this, this.props.id)}>
                +
                </button>
           
            <button className='downButton' onClick={this.props.editDownQ.bind(this, this.props.id)}>
                -
            </button>
            </li>
            <li className='buttons'>
                <button className='delButton' onClick={this.props.delItem.bind(this,this.props.id)}>
                del
                </button>
               
            </li>
        </ul>
    );
  }

  
}

export default Item;
