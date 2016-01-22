var React = require('react'),
    cx = require('classnames'),
    ThreadPreViewViewModel = require('./ThreadPreViewViewModel');

var ThreadPreViewView = React.createClass({

  propTypes: {
    thread: React.PropTypes.object
  },

  componentWillMount: function() {
    this.rep = new ThreadPreViewViewModel(this.props.thread);
    this.rep.on(this.rep.EventType.SET_ACTIVE_THREAD, this.updateThread);
    this.rep.on(this.rep.EventType.NEW_MESSAGE, this.updateThread);
    this.rep.on(this.rep.EventType.SET_ACTIVE_CHAT_BOX, this.updateThread);

    this.setState({
      active: this.rep.getActive(),
      user: this.rep.user,
      lastMessage: this.rep.lastMessage
    })
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.SET_ACTIVE_THREAD, this.updateThread);
    this.rep.off(this.rep.EventType.NEW_MESSAGE, this.updateThread);
    this.rep.off(this.rep.EventType.SET_ACTIVE_CHAT_BOX, this.updateThread);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
      return this.state.unread != nextState.unread ||
             this.state.active != nextState.active
  },

  setActive: function() {
    this.props.onClickThreadPreView(this.rep.thread);
  },

  updateThread: function() {
    this.setState({
      active: this.rep.getActive(),
      lastMessage: this.rep.lastMessage,
      unread: this.rep.thread.unread
    })
  },

  render: function() {
    return (
        <div className={cx('thread-preView', {'active': this.state.active}, {'unread': this.state.unread})}
             onClick={this.setActive}>
          <img className="thread-preView__img" src={this.state.user.picture.thumbnail} />
          <span className="thread-preView__name">
            <strong>
              {this.state.user.getFullName()}
            </strong>
            <span className="thread-preView__last-message">
              {this.state.lastMessage}
            </span>
          </span>
        </div>
    );
  }
});

module.exports = ThreadPreViewView;
