import React from 'react';
import TweenMax from 'gsap';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      notes: this.props.notes
    }

    this.handleChange =  this.handleChange.bind(this);
    this.handleClickComplete = this.handleClickComplete.bind(this);

    this.displayNoteText = this.displayNoteText.bind(this);
    this.displayEditBtn = this.displayEditBtn.bind(this);
    this.displayCompleteBtn = this.displayCompleteBtn.bind(this);

    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handClickEditConfirm = this.handClickEditConfirm.bind(this);
  }

  componentDidMount() {
    TweenMax.from(this.refs.listItem, 0.25, {
      delay: this.props.position/10,
      top: '-25px',
      opacity: 0
    });
  }

  handleChange(e) {
    this.setState({
      notes: e.target.value
    });
  }

  handleClickComplete() {
    var _this = this;
    TweenMax.to(this.refs.listItem, 0.25, {
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

  handleClickEdit() {
    this.setState({
      edit: !this.state.edit,
      notes: this.props.notes
    });
  }

  handClickEditConfirm() {
    this.setState({
      edit: !this.state.edit
    });
    this.props.updateNote(this.props.id, this.state.notes);
  }

  displayEditBtn() {
    if (!this.state.edit) {
      var polyStyle = {
        fill: '#F3EDDC'
      }
      return (
        <button className="listItem__amend" onClick={this.handleClickEdit}>
          <svg x="0px" y="0px" viewBox="0 0 642.1 642.1">
            <circle id="bg_1_" className="bg" cx="321" cy="321" r="321"/>
            <g id="pencil" className="pencil">
            	<rect x="201.6" y="191.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -69.6674 342.5067)" width="354" height="128.1"/>
            	<path d="M607.4,74.6l-48.1-48.1c-11.7-11.7-31.6-10.9-44.3,1.8l-45.2,45.2l90.6,90.6l45.2-45.2C618.3,106.2,619.1,86.3,607.4,74.6z
            		"/>
            	<polygon points="199.7,349.5 167.7,466.2 284.4,434.2 	"/>
            </g>
          </svg>
        </button>
      );
    } else {
      return (
        <button className="listItem__amendConfirm" onClick={this.handClickEditConfirm}>
          <svg x="0px" y="0px" viewBox="0 0 642.1 642.1" >
            <circle id="bg_1_" className="bg" cx="321" cy="321" r="321"/>
            <path id="check_1_" className="check" d="M526.6,174.7l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L259.5,388.1
            	c0,0-78.5-75.5-80.7-77.7c-2.2-2.2-5.1-5.9-9.5-5.9s-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1
            	c-1.2,1.7-2,3.6-2,5.7c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1s5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2l249.1-320
            	c1.2-1.7,2-3.6,2-5.8C529,178.6,528,176.5,526.6,174.7z"/>
          </svg>
        </button>
      );
    }
  }

  displayNoteText() {
    if (!this.state.edit) {
      if (this.props.notes) {
        return (
          <div className="noteData">
            {this.props.notes}
          </div>
        );
      }
    } else {
      return (
        <div className="noteData--edit">
          <textarea defaultValue={this.state.notes} onChange={this.handleChange}></textarea>
        </div>
      );
    }
  }

  displayCompleteBtn() {
    var classes = 'listItem__complete btn'
    var disabled = false;
    if (this.state.edit) {
      disabled = true;
      classes = 'listItem__complete btn disabled';
    }

    return (
      <button className={ classes } onClick={this.handleClickComplete} disabled={ disabled } >
        <svg x="0" y="0" viewBox="0 0 415.9 384.1">
          <path d="M413.5 45.7L358.6 2.4C356.9 1 354.8 0 352.4 0c-2.4 0-4.6 1-6.3 2.5L146.4 259.1c0 0-78.5-75.5-80.7-77.7 -2.2-2.2-5.1-5.9-9.5-5.9s-6.4 3.1-8.7 5.4c-1.7 1.8-29.7 31.2-43.5 45.8 -0.8 0.9-1.3 1.4-2 2.1 -1.2 1.7-2 3.6-2 5.7 0 2.2 0.8 4 2 5.7l2.8 2.6c0 0 139.3 133.8 141.6 136.1s5.1 5.2 9.2 5.2c4 0 7.3-4.3 9.2-6.2l249.1-320c1.2-1.7 2-3.6 2-5.8C415.9 49.6 414.9 47.5 413.5 45.7z"></path>
        </svg>
      </button>
    );
  }

  render() {
    return (
      <li className="listItem" ref="listItem">

        {this.displayEditBtn()}

        <div className="listItem__text">
          <div className="listItem__name">{this.props.name}</div>

          <div className="listItem__notes">
            { this.displayNoteText() }
          </div>

        </div>
        {this.displayCompleteBtn()}
      </li>
    )
  }
}

TodoListItem.defaultProps = {
  notes: ''
}

TodoListItem.propTypes = {
  notes: React.PropTypes.string
}
