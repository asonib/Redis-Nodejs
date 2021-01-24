const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

const app = express();

// create and connect redis client to local instance.
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// use response-time as a middleware
app.use(responseTime());


// create an api/search route
app.get('/api/search', (req, res) => {
  
  const fetch = 'profile'
  const searchUrl = `http://devport-app.herokuapp.com/api/${fetch}`;

  // checking if the search is already cached in redis.
  return client.get(`devport: ${fetch}`, (err, result) => {
    if (result) {

      return res.status(200).json(result);

    } else { 
      // Fetch directly from Devport API if the store is not present in redis cache.
      return axios.get(searchUrl)
        .then(response => {
          
          // Save the Wikipedia API response in Redis store
          client.setex(`devport: ${fetch}`, 3600, JSON.stringify({ source: 'Redis Cache', ...response.data, }));
          // Send JSON response to client
          console.log(response.data)
          return res.status(200).json({ source: response.data });
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port: ', 3000);
});