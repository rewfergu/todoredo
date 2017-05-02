import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import TodoRedo from '../app/components/TodoRedo';
import MenuBar from '../app/components/MenuBar';
import DailyList from '../app/components/DailyList';
import TodoList from '../app/components/TodoList';
import Login from '../app/components/Login';
import firebase from 'firebase';
import FirebaseConfig from '../firebaseConfig';

global.localStorage = {};

describe("<TodoRedo />", function() {
  let wrapper = mount(<TodoRedo />);;

  beforeEach('Reset', (done) => {
    if (firebase.app) {
      firebase.app().delete().then(() => {
        wrapper = mount(<TodoRedo />);
        done();
      });
    } else {
      done();
    }
  });

  it("should display the login when no user is present", function() {
    expect(wrapper.find('.login').length).to.equal(1);
  });
  
  it("should display the menu bar on login", function() {
      wrapper.setState({
        user: {
          lastLogin: "Tuesday, November 15th, 2016",
          name: "Test",
        }
      });
      expect(wrapper.find('.pageHeader').length).to.equal(1);
  });

  it("should display the daily list on login", function() {
    wrapper.setState({
        user: {
          lastLogin: "Tuesday, November 15th, 2016",
          name: "Test",
        }
      });
      expect(wrapper.find('.dailyList').length).to.equal(1);
  });

  it("should display a todo list when selected", function() {
    wrapper.setState({
      user: {
        lastLogin: "Tuesday, November 15th, 2016",
        name: "Test",
      },
      currentList: 'Todo List',
    });
    expect(wrapper.find('.todoList').length).to.equal(1);
  });
});