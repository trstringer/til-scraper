const Twitter = require('twitter');

module.exports = (auth, searchTerm, cb) => {
  const client = new Twitter({
    consumer_key: auth.consumerKey,
    consumer_secret: auth.consumerSecret,
    access_token_key: auth.accessTokenKey,
    access_token_secret: auth.accessTokenSecret
  });

  client.stream('statuses/filter', { track: searchTerm }, cb);
};