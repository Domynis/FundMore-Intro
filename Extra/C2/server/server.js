const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


/*
Empirically we see that the server starts acting poorly at about 400 requests per second.

For 250 for example, the server is able to handle all requests and respond to them in a timely manner.

--------------------------------
Summary report @ 13:48:36(+0300)
--------------------------------

http.codes.200: ................................................................ 15000
http.downloaded_bytes: ......................................................... 180000
http.request_rate: ............................................................. 250/sec
http.requests: ................................................................. 15000
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 12
  mean: ........................................................................ 0.5
  median: ...................................................................... 0
  p95: ......................................................................... 1
  p99: ......................................................................... 2
http.responses: ................................................................ 15000
vusers.completed: .............................................................. 15000
vusers.created: ................................................................ 15000
vusers.created_by_name.0: ...................................................... 15000
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 1.5
  max: ......................................................................... 72.3
  mean: ........................................................................ 3.2
  median: ...................................................................... 2.6
  p95: ......................................................................... 5.5
  p99: ......................................................................... 12.3


For 300 it starts to experience some issues in handling the incoming requests.

Summary report @ 14:01:40(+0300)
--------------------------------

errors.EADDRINUSE: ............................................................. 935
errors.ETIMEDOUT: .............................................................. 627
http.codes.200: ................................................................ 16438
http.downloaded_bytes: ......................................................... 197256
http.request_rate: ............................................................. 288/sec
http.requests: ................................................................. 18000
http.response_time:
  min: ......................................................................... 0
  max: ......................................................................... 1303
  mean: ........................................................................ 1.1
  median: ...................................................................... 0
  p95: ......................................................................... 1
  p99: ......................................................................... 5
http.responses: ................................................................ 16438
vusers.completed: .............................................................. 16438
vusers.created: ................................................................ 18000
vusers.created_by_name.0: ...................................................... 18000
vusers.failed: ................................................................. 1562
vusers.session_length:
  min: ......................................................................... 1.5
  max: ......................................................................... 7837.5
  mean: ........................................................................ 45.5
  median: ...................................................................... 2.5
  p95: ......................................................................... 8.1
  p99: ......................................................................... 1556.5
*/