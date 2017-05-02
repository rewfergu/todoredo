import React from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import TodoListItem from'./TodoListItem';
import Loading from './Loading';
import TweenMax from 'gsap';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.fb = firebase.database();
    this.todoList = this.fb.ref('/todolist/' + this.props.uid + '/lists/' + this.props.list);

    this.state = {
      list: [],
      loaded: false,
      newItem: false,
      newItemName: '',
    }

    this.completeItem = this.completeItem.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.toggleNewItem = this.toggleNewItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.setNewItemName = this.setNewItemName.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.displayNewItemForm = this.displayNewItemForm.bind(this);
  }

  componentWillMount() {
    const _this = this;

    this.todoList.on('value', (listData) => {
      const list = listData.val();
      const listArray = [];
      console.log('todo list data', list);

      _.forEach(list, function(list, key) {
        var listItem = list;
        listItem.key = key;
        listArray.push(listItem);
      });

      _this.setState({
        list: listArray,
      });
    });
  }

  componentDidMount() {
    this.setState({
      loaded: true
    });
    TweenMax.set(this.refs.newListItem, {height: 0});
  }

  completeItem(id) {
    var child = this.todoList.child(id);
    child.update({completed: true});
  }

  updateNote(id, note) {
    var child = this.todoList.child(id);
    child.update({notes: note});
  }

  toggleNewItem() {
    this.setState({
      newItem: !this.state.newItem
    });

    if (!this.state.newItem) {
      TweenMax.set(this.refs.newListItem, {height: 'auto'});
      TweenMax.from(this.refs.newListItem, 0.25, {height: 0});
    } else {
      TweenMax.to(this.refs.newListItem, 0.25, {height: 0});
    }
  }

  setNewItemName(e) {
    this.setState({
      newItemName: e.target.value
    });
  }

  addNewItem(e) {
    e.preventDefault();

    this.todoList.push({
      'completed': false,
      'name': this.state.newItemName,
      'notes': ''
    });
    this.setState({
      newItemName: '',
      newItemDay: 'Any',
    });
  }

  displayNewItemForm() {
    return (
      <div className="newListItemWrap">
        <div className="newListItemToggle">
          <button className="newListItemToggle__add btn" onClick={this.toggleNewItem}>
            Add Item
            <svg x="0" y="0" viewBox="0 0 447.9 255.9"><path d="M224 85.6L224 85.6 224 85.6l174.2 167.2c4.3 4.2 11.4 4.1 15.8-0.2l30.6-29.9c4.4-4.3 4.5-11.3 0.2-15.5L232.1 3c-2.2-2.2-5.2-3.2-8.1-3 -3-0.1-5.9 0.9-8.1 3L3.2 207.2c-4.3 4.2-4.2 11.2 0.2 15.5L34 252.6c4.4 4.3 11.5 4.4 15.8 0.2L224 85.6z"></path></svg>
          </button>
        </div>
        <form className="newListItem container" ref="newListItem" onSubmit={this.addNewItem}>
          <div className="newListItem__form">
            <input type="text" required className="newListItem__name" placeholder="task" value={this.state.newItemName} onChange={this.setNewItemName} />
            <button className="newListItem__add btn" type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    var _this = this;
    return (
      <main className="pageContent container">
      <header>
      <div className="listHeading">
        <h2 className="listHeading__name">{this.props.list}</h2>
      </div>
      </header>

      <Loading loaded={this.state.loaded} />

      <ul className="todoList">
        {
          this.state.list.map(function(itemData, i) {
            if (itemData.completed === false) {
              return (
                <TodoListItem
                  key={itemData.key}
                  id={itemData.key}
                  name={itemData.name}
                  completed={itemData.completed}
                  notes={itemData.notes}
                  markItemAsComplete={_this.completeItem}
                  updateNote={_this.updateNote}
                  position={i} />
              );
            }
          })
        }
      </ul>
      {this.displayNewItemForm()}
      </main>
    )
  }
}
