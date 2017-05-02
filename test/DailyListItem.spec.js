import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import DailyListItem from '../app/components/DailyListItem';

describe("<DailyListItem />", function() {
  let wrapper;

  it("displays an item for the daily list", () => {
    wrapper = mount(
      <DailyListItem
        id="testItem1"
        name="Test Item 1"
        day="Any"
      />
    );
    expect(wrapper.find('.listItem').nodes[0].id).to.equal('testItem1');
    expect(wrapper.find('.listItem').text()).to.equal('Test Item 1');
  });
});