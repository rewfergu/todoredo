import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import DailyList from '../app/components/DailyList';
import moment from 'moment';
import _ from 'lodash';

describe("<DailyList />", function() {
  let wrapper;
  let dailyListObject;
  let dailyListArray;

  beforeEach('Reset', () => {
    dailyListArray = [];
    dailyListObject = {
      "-testItem1" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem1",
        "name" : "make tea",
        "position" : 1
      },
      "-testItem2" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem2",
        "name" : "feed marty",
        "position" : 3
      },
      "-testItem3" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem3",
        "name" : "make breakfast",
        "position" : 0
      },
      "-testItem4" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem4",
        "name" : "exercise",
        "position" : 2
      },
      "-testItem5": {
        "completed": false,
        "day": 9,
        "key": "-testItem5",
        "name": "take out trash",
        "position": 4
      }
    }

    _.forEach(dailyListObject, (item) => {
      dailyListArray.push(item);
    });

    wrapper = mount(<DailyList lastLogin={moment().format('dddd, MMMM Do, YYYY')} />);
    wrapper.setState({
      list: dailyListArray,
      listObject: dailyListObject,
    });
  });

  it("shows a new day message if it's the first login for that day", () => {
    wrapper.setProps({lastLogin: 'yesterday'});
    expect(wrapper.find('.newDay').length).to.equal(1);
    expect(wrapper.find('.newDay--hidden').length).to.equal(0);
  });

  it("does not load a new day message if the user has logged in at least once today", () => {
    expect(wrapper.find('.newDay').length).to.equal(0);
  });

  it("displays a list of items for every day tasks", function() {
    expect(wrapper.find('.listItem').length).to.equal(4);
  });

  it("displays a list of items for every day tasks plus specific day tasks", function() {
    wrapper.setState({
      today: 9
    });
    expect(wrapper.find('.listItem').length).to.equal(5);
  });

  it('removes an item when complete', () => {
    expect(wrapper.find('#-testItem3').length).to.equal(1);
    // wrapper.node.completeItem('-testItem3');

    const dailyListObject = {
      "-testItem1" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem1",
        "name" : "make tea",
        "position" : 1
      },
      "-testItem2" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem2",
        "name" : "feed marty",
        "position" : 3
      },
      "-testItem3" : {
        "completed" : true,
        "day" : "Any",
        "key" : "-testItem3",
        "name" : "make breakfast",
        "position" : 0
      },
      "-testItem4" : {
        "completed" : false,
        "day" : "Any",
        "key" : "-testItem4",
        "name" : "exercise",
        "position" : 2
      },
      "-testItem5": {
        "completed": false,
        "day": 2,
        "key": "-testItem5",
        "name": "take out trash",
        "position": 4
      }
    }

    let dailyListArray = [];

    _.forEach(dailyListObject, (item) => {
      dailyListArray.push(item);
    });

    wrapper.setState({
      list: dailyListArray,
      listObject: dailyListObject,
    });

    expect(wrapper.find('#-testItem3').length).to.equal(0);
  });

  it('adds a new item to the list on form submit', () => {
    wrapper.setState({
      newItemName: 'new item test'
    });
    
    dailyListArray.push({
      completed: false,
      name: wrapper.state('newItemName'),
      day: wrapper.state('newItemDay'),
      key: '-testItem5',
    });

    wrapper.setState({
      list: dailyListArray
    });

    expect(wrapper.find('#-testItem5').length).to.equal(1);
  });

  it('displays all daily todos when the edit button is toggled', () => {
    let list = wrapper.state('list');
    list[0].completed = true;
    wrapper.setState({list});
    expect(wrapper.find('.listItem').length).to.equal(3);

    wrapper.node.toggleEdit();
    expect(wrapper.find('.listItem').length).to.equal(5);

    wrapper.node.toggleEdit();
    expect(wrapper.find('.listItem').length).to.equal(3);
  });

   // it('resets each day', () => {
     // resetDailyList probably needs to be modified to make it more testable
  // });
});