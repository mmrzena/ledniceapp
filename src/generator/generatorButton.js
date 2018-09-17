import React, { Component } from 'react';
import OwnedItems from './ownedItems.js';
import MissingItems from './missingItems.js';

class GeneratorButton extends Component {

    renderDiv(){
        if(this.props.openGeneratorModal){
            return (
                <div className="openModal">
                    <div className="contentModal contentModalShoppingList">
                    <button className='closeModal' onClick={this.props.changeOpenGeneratorModal.bind(this)}>
                    X
                   </button>
                   <ul className='ownedItems'>
                       Items in the fridge: 
                        {this.renderOwnedItems()}
                   </ul>
                   <ul className='missingItems'>
                       Missing items:
                        {this.renderMissingItems()}
                   </ul>
                    </div>
                </div>
            )
        }
    }

    renderOwnedItems(){
        return this.props.items
               .map(item => 
                <OwnedItems
                key={item.id}
                {...item}
                />
                )
    }

    renderMissingItems(){
        let subcategories = this.props.category
                            .map(category => category.subcategories.map(subcategory => subcategory.name))
                            .reduce((total, amount) => {
                                    return total.concat(amount);
                                    }, []);

        let itemSubcategories = this.props.items.map(item => item.subcategoryName);
        let missingItems = subcategories.filter(item => !itemSubcategories.includes(item));
        return missingItems.map((item, index) => <MissingItems key={index} item={item}/>)

        
    }

  render() {
    return (
        <div>
            <button className='openModalButton' onClick={this.props.changeOpenGeneratorModal.bind(this)}>
            Generate Shopping List
            </button>
            {this.renderDiv()}
        </div>
    );
  }


//   render() {
//     return (
//         <div>
//             <button className='generatorButton'>
//             Generate Shopping List
//             </button>
//         </div>
//     );
//   }

}

export default GeneratorButton;
