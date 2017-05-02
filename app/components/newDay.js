var React = require('react');

var NewDay = React.createClass({
  getInitialState() {
    return {
      hidden: false
    }
  },
  handleClick() {
    this.props.resetDailyList();
    this.setState({
      hidden: true
    })
  },
  render() {

    return (
      <div className={this.state.hidden ? 'newDay newDay--hidden' : 'newDay'}>
        <div className="container">
          <div className="newDay__message">
            <h1>Its a new day. Think positive.</h1>
            <button onClick={this.handleClick} className="newDay__btn btn">Continue</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = NewDay;
