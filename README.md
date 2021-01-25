# Redis-Nodejs
A Redis-Nodejs Example for reducing response time from the server. Make a request to the API, if the query is found in the redis store then the cached response is returned else the new response is added to the redis store to be sent in the next API call.

**First Call To The API**: `The response time is 1.78sec. The query key is not found in the redis store therefore an the response time is high because it is fetching from the server. After that request key query is added to the redis store so that during the next call reponse will be faster.`

![alt text](https://github.com/asonib/Redis-Nodejs/blob/master/others/img/before.JPG)

**Next Call To The Same API Endpoint**: `The response time is 4milli-second. The query key is found in the redis store therefore an the response time is very low because it is fetching from the redis cache.`

![alt text](https://github.com/asonib/Redis-Nodejs/blob/master/others/img/after.JPG)

