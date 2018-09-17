import React, { Component } from 'react';

class Subcategories extends Component {

    constructor(){
        super();

        this.state = {
            inputValue: '',
            class: ''
        }
    }

    componentDidMount(){
        let classCategory = this.props.props.name.toLowerCase().replace(/\s+/g, '')
        this.setState({class: classCategory});
    }

    handleQ(e){
        let value = parseInt(e.target.value);
        this.setState({inputValue: value});
    }

    increaseInputValue(){
        let inputValueCopy = this.state.inputValue;
        inputValueCopy++;
        this.setState({inputValue: inputValueCopy});
    }

    decreaseInputValue(){
        if(this.state.inputValue <= 1) {
            this.setState({inputValue: ''})
        } else {
        let inputValueCopy = this.state.inputValue;
        inputValueCopy--;
        this.setState({inputValue: inputValueCopy});
        }
    }

    clearInputValue(){
        this.props.handleQinModal(this.state.inputValue, this.props.id, this.props.props.id, this.props.name);
        this.setState({inputValue: ''});       
    }

  render() {
    return (
        <li className='subcategory'>
        <button className={this.state.class + ' subcategoryNameButton'} onClick={this.clearInputValue.bind(this)}>
            {this.props.name}
        </button>
        <input className='subcategoryInput' 
        type='number' value={this.state.inputValue} onChange={this.handleQ.bind(this)}
        placeholder='quantity'
        />
        
        <button className='subcategoryPlusButton' onClick={this.increaseInputValue.bind(this)}>
        +
        </button>

        <button className='subcategoryMinusButton' onClick={this.decreaseInputValue.bind(this)}>
        -       
        </button>


        
        </li>
    );
  }

}

export default Subcategories;
