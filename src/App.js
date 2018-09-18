import React, { Component } from 'react';
import './style/App.css';
import ItemList from './itemList/ItemList.js';
import Filter from './filter/filter.js';
import AddItemButton from './modal/addItemButton.js';
import category from './variables/variables.js';
import GeneratorButton from './generator/generatorButton.js';
import database, { firebase } from './firebase/firebase';
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

const dbRef = database.collection('items');

class App extends Component {
  constructor(props) {
    super(props);

    // this.getData();

    this.state = {
      items: [],
      filterString: '',
      category: category,
      openModal: false,
      openGeneratorModal: false,
      loading: true,
    };
  }
 
 getData() {
    dbRef.onSnapshot(querySnapshot => {
      let myData = [];
      this.setState({items: myData})
      this.setState({loading: true})
      let counter = 0
      querySnapshot.forEach( doc => {
          let itemsId=this.state.items.map(item => item.id);
          if(itemsId.includes(doc.data().id)){
            return
          } else {
            // let myData = this.state.items;
            myData.push(doc.data());
            this.setState({items: myData})
          }
          counter++
      })
      if(counter === myData.length) {
        this.setState({loading: false})
      }
    })
  }

  componentDidMount() {
    this.getData();
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
        <AddItemButton 
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
            loading={this.state.loading}
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
      dbRef.add({
          id: id,
          categoryId: category,
          subcategoryId: subcategoryId,
          subcategoryName: subcategoryName,
          q: q
      }).then(() => console.log('added'))
  }

  handleQinModal(q, subcategoryId, categoryId, subcategoryName){
    let itemsCopy = this.state.items;
    let objectIndex = itemsCopy.findIndex(object => object.subcategoryId === subcategoryId);
    (objectIndex >= 0) ? (itemsCopy[objectIndex].q += q) : this.createTask(subcategoryName, q, categoryId, subcategoryId);
    this.setState({ items: itemsCopy});
  }
  

  giveNewId(){
    if(this.state.items.length === 0) {
      return 1
    } else {
    let arrayOfId = this.state.items.map(id => id.id)
    let highestId = Math.max.apply(Math, arrayOfId)
    highestId++
    return highestId
    }
  }

  delItem(id){
    // this.setState({ items: this.state.items.filter(newItem => newItem.id !== id)});

    dbRef.where("id", "==", id)
    .get()  
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

  }

  editUpQ(id){
    // let itemsCopy = this.state.items;
    // let objectIndex = itemsCopy.findIndex(object => object.id === id);
    // itemsCopy[objectIndex].q += 1;
    // this.setState({ items: itemsCopy})
        dbRef.where("id", "==", id)
        .get()  
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            let quantity = doc.data().q;
            quantity++
            dbRef.doc(doc.id).update({q: quantity})
            .then(() => {
              console.log("Value successfully increased!");
            }).catch(function(error) {
              console.error("Error increasing quantity: ", error);
            });
          });
          })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

  }

  editDownQ(id){
    let itemsCopy = this.state.items;
    let objectIndex = itemsCopy.findIndex(object => object.id === id);
  
    if(this.state.items[objectIndex].q === 1){
      {this.delItem(id)}
    } else {
      dbRef.where("id", "==", id)
      .get()  
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          let quantity = doc.data().q;
          quantity--
          dbRef.doc(doc.id).update({q: quantity})
          .then(() => {
            console.log("Value successfully decreased!");
          }).catch(function(error) {
            console.error("Error decreasing quantity: ", error);
          });
        });
        })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }
  }




}

export default App;
