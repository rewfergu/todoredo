import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import TodoListItem from '../app/components/TodoListItem';

describe("<TodoListItem />", function() {
  let wrapper;

  it("displays an item for the todo list", () => {
    wrapper = mount(
      <TodoListItem
        id="testItem1"
        name="Test Item 1"
        notes="This is a note."
      />
    );
    expect(wrapper.find('.listItem__name').text()).to.equal('Test Item 1');
    expect(wrapper.find('.listItem__notes').text()).to.equal('This is a note.');
  });
});