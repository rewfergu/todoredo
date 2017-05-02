import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import TodoList from '../app/components/TodoList';

describe("<TodoList />", function() {
  let wrapper;
  let currentList = '';
  let list;
  let selectList = function(name) {
    currentList = name;
  }
  beforeEach('Reset', () => {
    list = [
      {
        completed: false,
        name: "one fish",
        notes: "this is a test",
        key: "-onefish"
      },
      {
        completed: false,
        name: "two fish",
        notes: "",
        key: "-twofish"
      },
      {
        completed: false,
        name: "red fish ",
        notes: "",
        key: "-redfish"
      },
      {
        completed: false,
        name: "blue fish",
        notes: "",
        key: "-bluefish"
      }
    ];

    wrapper = mount(<TodoList list={'Test List'}/>);
    wrapper.setState({list});
  });

  it('should display a list of todo items', () => {
    expect(wrapper.find('.listItem').length).to.equal(4);
  });

  it('should remove an item from the list on complete', () => {
    let list = wrapper.state('list');
    list[0].completed = true;
    wrapper.setState({list});

    expect(wrapper.find('.listItem').length).to.equal(3);
  });

  it('should be able to add a new note', () => {
    list[1].notes = 'this is a test for two fish';
    wrapper.setState({list: list});
    expect(wrapper.find('.listItem').at(1).find('.listItem__notes').text()).to.equal('this is a test for two fish');
  });

  // it('should be able to edit an existing note', () => {
    // Im not sure how to do this without using a round trip from firebase
  // });

  it('should be able to add a new item', () => {
    wrapper.setState({
      newItemName: 'New Test Item',
    });

    list.push({
      'completed': false,
      'name': wrapper.state('newItemName'),
      'notes': ''
    });

    wrapper.setState({list});

    expect(wrapper.find('.listItem').length).to.equal(5);
  });
});