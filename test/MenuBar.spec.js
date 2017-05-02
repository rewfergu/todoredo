import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Moment from 'moment';
import MenuBar from '../app/components/MenuBar';

describe("<MenuBar />", function() {
  let wrapper;
  let lists;
  beforeEach('Reset', () => {
    lists = [
      {
        key: '-onefish',
        name: 'one fish',
      },
      {
        key: '-twofish',
        name: 'two fish',
      },
      {
        key: '-redfish',
        name: 'red fish',
      },
      {
        key: '-bluefish',
        name: 'blue fish',
      }
    ];

    wrapper = mount(<MenuBar lists={lists} />);
    wrapper.setState({lists});
  });

  it('should display the current date', () => {
    const today = Moment().format('dddd, MMMM Do, YYYY');
    expect(wrapper.find('.titleBar__date').text()).to.equal(today);
  });

  it('should display a list of todo lists', () => {
    // list length should account for dailylist which is always present
    expect(wrapper.find('.listMenu__list').length).to.equal(5);
  });

  it('should be able to add a new list to the menu', () => {
    lists.push({
      key: '-newList',
      name: 'new list'
    });
    wrapper.setState({lists});

    expect(wrapper.find('.listMenu__list').length).to.equal(6);
    expect(wrapper.find('.listMenu__list').at(5).text()).to.equal('new list');
  });

  // it('should be able to remove a list from the menu', () => {
    // this might be too closely linked to firebase to test properly
  // });
});
