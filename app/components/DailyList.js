import React from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import Dragula from 'Dragula';
import DailyListItem from './DailyListItem';
import NewDay from './newDay.js';
import moment from 'moment';
import TweenMax from 'gsap';

export default class DailyList extends React.Component {
  constructor(props) {
    super(props);

    const d = new Date();
    this.fb = firebase.database();
    this.dailyList = this.fb.ref('/dailyList/' + this.props.uid);
    this.users = this.fb.ref('/users/' + this.props.uid);

    this.state = {
      today: d.getDay(),
      dateString: moment().format('dddd, MMMM Do, YYYY'),
      edit: false,
      newItem: false,
      newItemName: '',
      newItemDay: 'Any',
      list: [],
    }

    this.drag = null;

    this.checkDay = this.checkDay.bind(this);
    this.resetDailyList =  this.resetDailyList.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleNewItem = this.toggleNewItem.bind(this);
    this.setNewItemDay = this.setNewItemDay.bind(this);
    this.setNewItemName = this.setNewItemName.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.displayNewItemForm = this.displayNewItemForm.bind(this);
    this.dailyListDecorator = this.dailyListDecorator.bind(this);
  }

  componentWillMount() {
    const _this = this;

    this.dailyList.orderByChild('position').on('value', (listData) => {
      const listArray = [];

      listData.forEach((child) => {
        let childObj = child.val();
        childObj.key = child.key;
        listArray.push(childObj);
      });

      _this.setState({
        list: listArray,
        listObject: listData.val(),
      });
    });
  }

  componentDidMount() {
    TweenMax.set(this.refs.newListItem, {height: 0});
  }

  checkDay() {
    if (this.props.lastLogin !== this.state.dateString) {
      return (<NewDay resetDailyList={this.resetDailyList} />);
    }
  }

  resetDailyList() {
    var _this = this;
    this.state.list.forEach(function(el, index) {
      var child = _this.dailyList.child(el.key);
      child.update({completed: false});
    });
    _this.users.update({lastLogin: this.state.dateString});
  }

  completeItem(id) {
    var child = this.dailyList.child(id);
    child.update({completed: true});
  }

  deleteItem(id) {
    var child = this.dailyList.child(id);
    child.set(null);
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    })
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

  setNewItemDay(e) {
    var day = e.target.attributes['data-day'].value;
    if (day !== 'Any') {
      this.setState({
        newItemDay: parseInt(day)
      });
    } else {
      this.setState({
        newItemDay: day
      });
    }
  }

  setNewItemName(e) {
    this.setState({
      newItemName: e.target.value
    });
  }

  addNewItem(e) {
    e.preventDefault();

    this.dailyList.push({
      'completed': false,
      'name': this.state.newItemName,
      'day': this.state.newItemDay
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
        <form className="newListItem container" ref="newListItem" onSubmit={this.addNewItem} >
            <div className="newListItem__form">
              <input required type="text" className="newListItem__name" placeholder="task" value={this.state.newItemName} onChange={this.setNewItemName}/>
              <button className="newListItem__add btn" type="submit">Add</button>
            </div>
            <div className="newListItem__itemFrequency">
              <button className={this.state.newItemDay == 'Any' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="Any" onClick={this.setNewItemDay}>Any</button>
              <button className={this.state.newItemDay == '0' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="0" onClick={this.setNewItemDay}>S</button>
              <button className={this.state.newItemDay == '1' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="1" onClick={this.setNewItemDay}>M</button>
              <button className={this.state.newItemDay == '2' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="2" onClick={this.setNewItemDay}>T</button>
              <button className={this.state.newItemDay == '3' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="3" onClick={this.setNewItemDay}>W</button>
              <button className={this.state.newItemDay == '4' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="4" onClick={this.setNewItemDay}>Th</button>
              <button className={this.state.newItemDay == '5' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="5" onClick={this.setNewItemDay}>F</button>
              <button className={this.state.newItemDay == '6' ? 'newListItem__itemFrequencyBtn btn active' : 'newListItem__itemFrequencyBtn btn'} data-day="6" onClick={this.setNewItemDay}>S</button>
            </div>
        </form>
      </div>
    );
  }

  dailyListDecorator(componentBackingInstance) {
    const _this = this;
    
    if (componentBackingInstance) {
      let options = { };
      this.drag = Dragula([componentBackingInstance], options);

      this.drag.on('drop', function(item) {
        const listData = _this.state.listObject;

        var pairs = [].map.call(this.containers[0].children, (item, index) => {
          listData[item.id].position = index;

          return {  
            id: item.id,
            position: index,
          }
        });

        _this.dailyList.set(listData).then(() => {
          // console.log('complete');
        });
      });
    }
  }

  render() {
    var _this = this;

    return (
      <main className="pageContent container">
      <header>
      <div className="listHeading">
        <h2 className="listHeading__name">Daily List</h2>
        <button className="listHeading__settings btn" onClick={this.toggleEdit}>
          <svg x="0px" y="0px" viewBox="0 0 384 384.1">
            <path d="M384,230.4v-76.8h-42.8c-3.4-14.4-8.9-28-16.1-40.5l29.8-29.7l-54.3-54.3l-29.1,29.1c-12.6-7.7-26.4-13.5-41.1-17.3V0h-76.8
              v40.9c-14.7,3.8-28.5,9.7-41.1,17.3L83.4,29.1L29.1,83.4l29.8,29.7c-7.2,12.5-12.6,26.1-16.1,40.5H0v76.8h44.1
              c3.8,13.7,9.5,26.6,16.7,38.6l-31.7,31.7L83.4,355l32.3-32.3c11.7,6.8,24.5,11.9,37.9,15.4v46h76.8v-46c13.5-3.5,26.2-8.6,37.9-15.4
              l32.3,32.3l54.3-54.3L323.3,269c7.2-11.9,12.9-24.8,16.7-38.6H384z M192,245.8c-29.7,0-53.7-24.1-53.7-53.8s24-53.8,53.7-53.8
              s53.8,24.1,53.8,53.8S221.7,245.8,192,245.8z"></path>
          </svg>
        </button>
      </div>
      </header>

      <ul ref={this.dailyListDecorator} className="dailyList">
      {this.state.list.map(function(itemData, i) {
        if (!_this.state.edit) {
          if (!itemData.completed) {
            if (itemData.day === _this.state.today || itemData.day === 'Any') {
              return (
                <DailyListItem 
                  key={itemData.key + itemData.position}
                  id={itemData.key}
                  edit={_this.state.edit}
                  name={itemData.name}
                  day={itemData.day}
                  markItemAsComplete={_this.completeItem}
                  position={itemData.position}
                />
              )
            }
          }
        } else  {
          return (
            <DailyListItem
              key={itemData.key}
              id={itemData.key}
              edit={_this.state.edit}
              name={itemData.name}
              day={itemData.day}
              markItemAsComplete={_this.completeItem}
              markItemForDelete={_this.deleteItem}
              position={itemData.position}
            />
          )
        }
      })}
      </ul>
      {this.displayNewItemForm()}
      {this.checkDay()}
      </main>
    )
  }
}
