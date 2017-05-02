import React from 'react';
import moment from 'moment';
import firebase from 'firebase';
import _ from 'lodash';
import ListMenuItem from './ListMenuItem';
import TweenMax from 'gsap';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      edit: false,
      lists: [],
    };

    this.fb = firebase.database();
    this.users = firebase.database().ref('/users/' + this.props.uid + '/lists');

    this.toggleMenu = this.toggleMenu.bind(this);
    this.selectList = this.selectList.bind(this);
    this.selectDailyList = this.selectDailyList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.setNewListName = this.setNewListName.bind(this);
  }

  componentWillMount() {
    const _this = this;
    this.users.on('value', (listData) => {
      const listArray = [];

      let lists = listData.val();

      // console.log('list data', lists);

      _.forEach(lists, function(list, key) {
          listArray.push({
            'key': key,
            'name': list.name
          });
      });

      _this.setState({
        lists: listArray,
      });

    });
  }

  componentDidUpdate() {
    if (this.state.edit) {
      TweenMax.set('#newListForm', { height: 'auto' });
      TweenMax.from('#newListForm', 0.25, { height: 0 });
    } else {
      TweenMax.to('#newListForm', 0.25, { height: 0 });
    }
  }

  selectList(list) {
    this.props.selectList(list);
    this.toggleMenu();
    this.setState({
      edit: false
    });
  }

  selectDailyList() {
    this.props.selectList('Daily List');
    this.toggleMenu();
    this.setState({
      edit: false
    });
  }

  deleteList(id, name) {
    var child = this.users.child(id);
    child.set(null);

    var listData = this.fb.ref('/todolist/' + this.props.uid + '/lists/' + id);
    // console.log(listData);
    // listData.set(null);
  }

  toggleMenu() {
    this.setState({
      openMenu: !this.state.openMenu
    });

    if (!this.state.openMenu) {
      TweenMax.set(this.refs.nav, {height: 'auto'});

      TweenMax.from(this.refs.nav, 0.25, {height: 0});
      // TweenMax.to('#logoutBtn', 0.25, {
      //   opacity: 1,
      //   y: 0,
      // });
    } else {
      TweenMax.to(this.refs.nav, 0.25, {height: 0});
      // TweenMax.to('#logoutBtn', 0.25, {
      //   opacity: 0,
      //   y: -20,
      // });
    }
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  addNewList(e) {
    e.preventDefault();
    var _this = this;

    //onChange={this.setNewListName}


    _this.refs.newListInput.value

    this.users.push({
      'name': _this.refs.newListInput.value
    }, function() {
      _this.refs.newListInput.value = '';
    });
  }

  setNewListName(e) {
    this.setState({
      newListName: e.target.value
    });
  }

  render() {
    const _this = this;
    return (
      <header className="pageHeader" ref="header">
      <div className="titleBar container">
        <p className="titleBar__date">{moment().format('dddd, MMMM Do, YYYY')}</p>
        <button className="titleBar__btn btn" onClick={this.toggleMenu}>
          <svg x="0px" y="0px" viewBox="0 0 384 320">
            <g>
              <path d="M353.4,128H30.6C13.7,128,0,142.3,0,160s13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32S370.3,128,353.4,128z"></path>
              <path d="M353.4,0H30.6C13.7,0,0,14.3,0,32s13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32S370.3,0,353.4,0z"></path>
              <path d="M353.4,256H30.6C13.7,256,0,270.3,0,288s13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32S370.3,256,353.4,256z"></path>
            </g>
          </svg>
        </button>
      </div>

      <nav ref="nav" className={!_this.state.openMenu ? 'listMenu--hide container' : 'listMenu container'}>

        <div className="listEdit">
          <button id="logoutBtn" className="logout__btn" onClick={() => { this.props.logout(); }}>
            Logout
          </button>
          <button className="btn listEdit__btn" onClick={_this.toggleEdit}>
            <svg x="0px" y="0px" viewBox="0 0 448 448">
              <path d="M429.9,83l-56.5,56.7l-55.1-10l-9.9-55.1l56.5-56.7C352.2,5.2,334.1-0.6,320.7,0.1c-13.5,0.7-42.3,8.3-64.6,32c-21.6,22.8-44.3,65.3-24.2,112.5c2.4,5.7,5.1,13.2-2.9,21.2c-8.1,8-215,202.8-215,202.8c-19.4,16.7-18,47.6-0.1,65.6c18.2,17.9,48.9,19,65.6-0.3c0,0,193.2-205.8,202.7-215.1c8.5-8.3,16.1-5.5,21.2-2.9c35.6,18.4,86.3,2.4,112.6-23.9c26.3-26.3,31.1-51.7,31.9-64.7C448.7,114.4,444.2,97.3,429.9,83z M59.3,411.3c-6.3,6.2-16.5,6.2-22.7,0c-6.2-6.3-6.2-16.5,0-22.7c6.3-6.2,16.5-6.2,22.7,0C65.5,394.9,65.5,405.1,59.3,411.3z"></path>
            </svg>
          </button>
        </div>

        <form className="newList" id="newListForm" onSubmit={this.addNewList}>
          <input required type="text" className="newList__input" ref="newListInput" placeholder="new list" />
          <button type="submit" className="newList__add btn">
            <svg x="0px" y="0px" viewBox="0 0 384 384">
              <path d="M373.3,160H234.7c-5.9,0-10.7-4.8-10.7-10.7V10.7C224,4.8,219.2,0,213.3,0h-42.6C164.8,0,160,4.8,160,10.7v138.6c0,5.9-4.8,10.7-10.7,10.7H10.7C4.8,160,0,164.8,0,170.7v42.6c0,5.9,4.8,10.7,10.7,10.7h138.6c5.9,0,10.7,4.8,10.7,10.7v138.6c0,5.9,4.8,10.7,10.7,10.7h42.6c5.9,0,10.7-4.8,10.7-10.7V234.7c0-5.9,4.8-10.7,10.7-10.7h138.6c5.9,0,10.7-4.8,10.7-10.7v-42.6C384,164.8,379.2,160,373.3,160z"></path>
            </svg>
          </button>
        </form>

        <ul>
          <li className="listMenu__list">
            <a className="listMenu__link" onClick={_this.selectDailyList} list="Daily List">Daily List</a>
          </li>
          {
            _this.state.lists.map(function(itemData, index) {
              return (
                <ListMenuItem
                  key={itemData.key}
                  id={itemData.key}
                  listName={itemData.name}
                  edit={_this.state.edit}
                  selectList={_this.selectList}
                  deleteList={_this.deleteList}
                  position={index}
                />
              )
            })
          }
        </ul>
      </nav>
      </header>
    );
  }
};
