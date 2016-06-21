const https = require('https');

module.exports = (tweet, cb) => {
  var tweetUrl = encodeURIComponent(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
  var requestUrl = `https://api.twitter.com/1/statuses/oembed.json?url=${tweetUrl}`;

  var data = '';
  https.get(requestUrl, (res) => {
    res.on('data', (resData) => {
      data += resData;
    });
    res.on('end', () => {
      cb(null, JSON.parse(data));
    });
  }).on('error', (err) => {
    cb(err);
  });
};