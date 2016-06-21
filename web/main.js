const React = require('react');
const ReactDOM = require('react-dom');
const io = require('socket.io-client');
var socket = io(SOCKET_URL);

var Tweet = React.createClass({
  render: function () {
    return (
      <div className='row'>
        <div className='tweet-card col-md-8 col-md-offset-2'>
          <figure>
            <blockquote>
              <p>{this.props.tweetText}</p>
              <footer>{this.props.author}</footer>
            </blockquote>
          </figure>
        </div>
      </div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return { tweets: [] };
  },
  componentDidMount: function () {
    socket.on('tweet', (data) => {
      this.setState({
        tweets: (() => {
          this.state.tweets.unshift({ 
            text: data.content,
            author: data.author 
          });

          return this.state.tweets;
        })()
      });
    });
  },
  render: function () {
    var tweetElements = this.state.tweets.map(function (tweet) {
      return (<Tweet tweetText={tweet.text} author={tweet.author} />);
    });

    return (
      <div>
        {tweetElements}
        <div className='wait-for-it col-md-4 col-md-offset-4'>
          <span>{tweetElements.length === 0 ? "Wait for it..." : ""}</span>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('reactContent'));