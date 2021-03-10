import React, { useState } from "react";
import ReactDOM from "react-dom";
import data from './data.json';
import './styles.css'

function App() {
  const [items, setItem] = useState(data);
  return (
    <div>
      <AddItemForm items={items} setItem={setItem}/>
      <ItemList items={items} setItem={setItem} />
    </div>
  );
}

function ItemList(props) {
  const handleItemStatusChange = (item) => {
    const itemToChange = props.items.find(x => x.name === item.name);
    itemToChange.completed = !item.completed;
    console.log(itemToChange.completed)
    props.setItem([...props.items]);
  }

  return (
    <div>
      {props.items.map((item, index) => {
        return (
          <div key={`${item.name}-${index}`} onClick={() => handleItemStatusChange(item)} className="circleContainer">
            <div className={item.completed ? "circle completedCircle" : "circle"} />
            <div className={item.completed ? "completedItem" : ""}>{item.name}</div>
        </div>
        )
      })}
    </div>
  )
}

function AddItemForm(props) {
  const [newItem, handleNewItemChange ] = useState('');

  const handleAddNewItem = (newItem) => {
    props.setItem([...props.items, { name: newItem, completed: false }]);
    handleNewItemChange('');
  }
  return (
    <form className="inputForm">
      <input value={newItem} onChange={(e) => handleNewItemChange(e.target.value)} type="text" placeholder="Add new item"/>
      <button onClick={() => handleAddNewItem(newItem)} className="addItemButton" type="button">Add item</button>
    </form>
  )
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App data={data} />, mountNode);