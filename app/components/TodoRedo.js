import React from 'react';
import firebase from 'firebase';
import FirebaseConfig from '../../firebaseConfig';
import Login from './Login';
import MenuBar from './MenuBar';
import DailyList from './DailyList';
import TodoList from './TodoList';

export default class TodoRedo extends React.Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(FirebaseConfig);
    this.fb = this.app.database();

    this.state = {
      auth: false,
      email: '',
      password: '',
      uid: '',
      currentList: 'Daily List',
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.logout = this.logout.bind(this);
    this.selectList = this.selectList.bind(this);
    this.displayList = this.displayList.bind(this);
  }

  componentWillMount() {
    var _this = this;
    this.checkSession();
  }

  checkSession() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log("auth", user);
        this.setState({
          auth: true,
          uid: user.uid,
        });
      } else {
        //console.log('no user');
      }
    });
  }

  handleSignIn(user) {
    let userData; 
    const userRef = firebase.database().ref('/users/' + user.uid);
    const _this = this;
    userRef.once('value', function(data) {
      userData = data.val() || {};
      _this.setState({
        user: userData,
        uid: user.uid,
        auth: true,
      });
    });
  }

  selectList(list) {
    this.setState({
      currentList: list,
    });
  }

  displayList() {
    if (this.state.currentList === 'Daily List') {
      return (
        <DailyList lastLogin={this.state.user.lastLogin} uid={this.state.uid} />
        );
    } else {
      return (
        <TodoList uid={this.state.uid} list={this.state.currentList} key={this.state.currentList}/>
      );
    }
  }

  logout() {
    firebase.auth().signOut();
    this.setState({
      auth: false,
      email: '',
      password: '',
      uid: '',
      user: null,
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <MenuBar
            lists={this.state.user.lists}
            uid={this.state.uid}
            selectList={this.selectList}
            logout={this.logout}
          />
          { this.displayList() }
        </div>
      );
    } else {
      return <Login loadUserData={this.handleSignIn} />;
    }
  }
}

