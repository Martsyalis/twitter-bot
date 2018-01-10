const TwitterPackage = require('twitter');
require('dotenv').config();

const secret = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

const Twitter = new TwitterPackage(secret);
const params = {
  q: 'puppy filter:media',
  count: 4,
};

Twitter.get('search/tweets', params, function(error, tweets, response) {
  const tweet_list = tweets['statuses'];
  
  for (let i = 0; i < tweet_list.length; i++) {
      if ('retweeted_status' in tweet_list[i]) {
          continue;
      } 
      console.log('--------------------------------tweet is', tweet_list[i]);
      const screen_name = tweet_list[i].user.screen_name;
      const message = "@" + screen_name + " Aww, how cute, im gonna steal your dog";
      const tweet_id = tweet_list[i].id_str
      Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
            console.log("Here is what was tweeted:", tweet);
            console.log("-------Error is:", error);
      });   
  }
});