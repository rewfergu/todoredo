import React from 'react';
import TweenMax from 'gsap';

export default class ListMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.deleteBtnId = `${this.props.id}_del`;

    this.deleteList = this.deleteList.bind(this);
    this.selectList = this.selectList.bind(this);
    this.showDeleteButton = this.showDeleteButton.bind(this);
  }

  componentDidUpdate() {
    if (this.props.edit) {
      TweenMax.to(`#${this.deleteBtnId}`, 0.25, {
        delay: this.props.position/10,
        width: 40,
        marginLeft: 10,
        padding: 10,
      });
    } else {
      TweenMax.to(`#${this.deleteBtnId}`, 0.25, {
        width: 0,
        marginLeft: 0,
        padding: 0,
      });
    }
  }

  deleteList() {
    this.props.deleteList(this.props.id, this.props.listName);
  }

  selectList(e) {
    this.props.selectList(e.target.attributes['list'].value);
  }

  showDeleteButton() {
    if (this.props.edit) {
      return (
        <button className="listMenu__delete btn" onClick={this.deleteList}>
          <svg x="0px" y="0px" viewBox="0 0 384 384.2">
            <path d="M379.6,322.9L248.4,191.2l131.5-130c5.4-5.4,5.4-14.2,0-19.6L342.5,4c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L192.1,133.6L61,4.1c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L4.1,41.7c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L4.5,322.9c-2.6,2.6-4.1,6.1-4.1,9.8s1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l130.6-131.2L322.8,380c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C383.8,329,382.2,325.5,379.6,322.9z"></path>
          </svg>
        </button>
      );
    }
  }

  render() {
    return (
      <li className="listMenu__list">
        <a className="listMenu__link" onClick={this.selectList} list={this.props.listName}>{this.props.listName}</a>

        { /* this.showDeleteButton() */ }

        <button id={this.deleteBtnId} className="listMenu__delete btn" onClick={this.deleteList}>
          <svg x="0px" y="0px" viewBox="0 0 384 384.2">
            <path d="M379.6,322.9L248.4,191.2l131.5-130c5.4-5.4,5.4-14.2,0-19.6L342.5,4c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L192.1,133.6L61,4.1c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L4.1,41.7c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L4.5,322.9c-2.6,2.6-4.1,6.1-4.1,9.8s1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l130.6-131.2L322.8,380c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C383.8,329,382.2,325.5,379.6,322.9z"></path>
          </svg>
        </button>
      </li>
    );
  }
}
