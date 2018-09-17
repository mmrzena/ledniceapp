import React, { Component } from 'react';
import './style/App.css';
import ItemList from './itemList/ItemList.js';
import Filter from './filter/filter.js';
import CategoryButton from './modal/categoryButton.js';
import category from './variables/variables.js';
import GeneratorButton from './generator/generatorButton.js'

const items = [
  { 
    id: 1,
    categoryId: 4,
    subcategoryId: 8,
    subcategoryName: "Maslo",
    q: 1
  },
  { 
    id: 2,
    categoryId: 4,
    subcategoryId: 8,
    subcategoryName: "Mleko",
    q: 2
  },
  { 
    id: 3,
    categoryId: 1,
    subcategoryId: 1,
    subcategoryName: "Jablko",
    q: 2
  },
  { 
    id: 4,
    categoryId: 7,
    subcategoryId: 12,
    subcategoryName: "Svijany",
    q: 1
  }
]





class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: items,
      filterString: '',
      category: category,
      openModal: false,
      openGeneratorModal: false,
    };
  }
  
  
  
  render() {
      
    return (
      <div className="App">    
        <Filter onTextChange={text => this.setState({filterString: text})} />

        <GeneratorButton
          changeOpenGeneratorModal={this.changeOpenGeneratorModal.bind(this)}
          openGeneratorModal={this.state.openGeneratorModal}
          category={this.state.category}
          items={this.state.items}
        />
        
        <CategoryButton 
          category={this.state.category}
          openModal={this.state.openModal}
          handleQinModal={this.handleQinModal.bind(this)}
          changeOpenModal={this.changeOpenModal.bind(this)}
          editUpQ={this.editUpQ.bind(this)}
          editDownQ={this.editDownQ.bind(this)}
          items={this.state.items} 
          createTask={this.createTask.bind(this)}
          placeholderText={this.state.placeholderText}
        />

        <ItemList 
            items={this.state.items} 
            category={this.state.category}
            filterString={this.state.filterString}
            delItem={this.delItem.bind(this)}
            editUpQ={this.editUpQ.bind(this)}
            editDownQ={this.editDownQ.bind(this)}
        />
      </div>
    );
  }

  changeOpenModal(){
    this.setState({openModal: !this.state.openModal});
  }

  changeOpenGeneratorModal(){    
    this.setState({openGeneratorModal: !this.state.openGeneratorModal});
  }

  createTask(subcategoryName,q,category, subcategoryId){
    if(q<1){
      return
    }
    let id = this.giveNewId();
    let itemsCopy = this.state.items; 

    itemsCopy.push({
      id: id,
      categoryId: category,
      subcategoryId: subcategoryId,
      subcategoryName: subcategoryName,
      q: q
    });

    this.setState({ items: itemsCopy});
  }

  giveNewId(){
    let arrayOfId = this.state.items.map(id => id.id)
    let highestId = Math.max.apply(Math, arrayOfId)
    highestId++
    return highestId
  }

  delItem(id){
    this.setState({ items: this.state.items.filter(newItem => newItem.id !== id)});
  }

  editUpQ(id){
    let itemsCopy = this.state.items;
    let objectIndex = itemsCopy.findIndex(object => object.id === id);
    itemsCopy[objectIndex].q += 1;
    this.setState({ items: itemsCopy})

  }

  editDownQ(id){
    let itemsCopy = this.state.items;
    let objectIndex = itemsCopy.findIndex(object => object.id === id);
  
    if(this.state.items[objectIndex].q === 1){
      {this.delItem(id)}
    } else {
    itemsCopy[objectIndex].q -= 1;
    this.setState({ items: itemsCopy})
    }
  }



  handleQinModal(q, subcategoryId, categoryId, subcategoryName){
    let itemsCopy = this.state.items;
    let objectIndex = itemsCopy.findIndex(object => object.subcategoryId === subcategoryId);
    (objectIndex >= 0) ? (itemsCopy[objectIndex].q += q) : this.createTask(subcategoryName, q, categoryId, subcategoryId);
    this.setState({ items: itemsCopy});
  }
  
}

export default App;
