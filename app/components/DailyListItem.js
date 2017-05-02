import React from 'react';
import TweenMax from 'gsap';

export default class DailyListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickComplete = this.handleClickComplete.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.switchButtons = this.switchButtons.bind(this);
  }

  componentDidMount() {
    //console.log(this.refs.dailyListItem);
    //TweenMax.set(this.refs.dailyListItem, {left: '100vw'});
    TweenMax.from(this.refs.dailyListItem, 0.25, {
      delay: this.props.position/10,
      top: '-25px',
      opacity: 0
    });
  }

  handleClickComplete() {
    var _this = this;
    TweenMax.to(this.refs.dailyListItem, 0.25, {
      css: {
        paddingTop: 0,
        paddingBottom: 0,
        borderTopWidth: 0,
        borderBottomWidth:0,
        height: 0,
        margin: 0,
      },
      onComplete: completeItem
    });

    function completeItem() {
      _this.props.markItemAsComplete(_this.props.id);
    };
  }

  handleClickDelete() {
    this.props.markItemForDelete(this.props.id);
  }

  switchButtons() {
    if (this.props.edit) {
      return(
        <button className="listItem__complete--remove btn" onClick={this.handleClickDelete}>
        <svg x="0px" y="0px" viewBox="0 0 384 384.2">
          <path d="M379.6,322.9L248.4,191.2l131.5-130c5.4-5.4,5.4-14.2,0-19.6L342.5,4c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4
            L192.1,133.6L61,4.1c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L4.1,41.7c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L4.5,322.9
            c-2.6,2.6-4.1,6.1-4.1,9.8s1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l130.6-131.2L322.8,380
            c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C383.8,329,382.2,325.5,379.6,322.9z"></path>
        </svg>
      </button>);
    } else {
      return(
        <button className="listItem__complete btn" onClick={this.handleClickComplete}>
        <svg x="0px" y="0px" viewBox="0 0 415.9 384.1">
        <path d="M413.5,45.7L358.6,2.4C356.9,1,354.8,0,352.4,0c-2.4,0-4.6,1-6.3,2.5L146.4,259.1c0,0-78.5-75.5-80.7-77.7
          c-2.2-2.2-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7
          c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320c1.2-1.7,2-3.6,2-5.8
          C415.9,49.6,414.9,47.5,413.5,45.7z"></path>
        </svg>
      </button>);
    }
  }

  render(){
    return(
      <li className="listItem" ref="dailyListItem" id={this.props.id} data-position={this.props.position}>
        <div className="listItem__name">{this.props.name}</div>
        {this.switchButtons()}
      </li>
    )
  }
}
