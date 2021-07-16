var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/home1.html');
});

app.post('/adduser', function(req, res) {
  var username = req.body.username;
  var dob = req.body.dob;
  var obj = {};
  var key = req.body.userid;
  var newuser = {
    name: username,
    dob: dob
  };
  obj[key] = newuser;

  fs.readFile('user.json', 'utf8', function(err, data) {
    data = JSON.parse(data);
    data[key] = obj[key];
    console.log(data);
    var updateuser = JSON.stringify(data);
    fs.writeFile('user.json', updateuser, function(err) {
      res.end(JSON.stringify(data));
    });
  });
});
app.listen(3000, function() {
  console.log('server is running');
});

// {"1":{"name":"SUDH1","dob":"2021-04-13"},"2":{"name":"KP","dob":"2021-07-13"},"3":{"name":"SUDH","dob":"2021-04-13"}}

{
  /* <html>
    <body>
        <form action="/adduser" method="POST">
            Userid: <input type="number" name="userid" id = "userid"> ,<br>
           Nmae: <input type="text" name="username" id = "username"> ,<br>
            DOB:<input type="date" name="dob" id="dob"> <br>
            <button type = "submit" name = "submit"> AddUser</button>
        </form>
    </body>

</html> */
}
