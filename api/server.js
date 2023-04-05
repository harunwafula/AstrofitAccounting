const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();
const port =  process.env.PORT || 3000;


let corsOptions = {
  origin: "https://astrofitaccounting.web.app"
};
app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(cors(corsOptions));


// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin',"https://astrofitaccounting.web.app");

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//establish database connection
mongoose.connect('mongodb+srv://astroauth:cBubJslXI8lcf9bU@cluster0.xeye1bv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully Connected to database');
}).catch((error) => {
  console.log('Error connecting to database', error);
});


//routes
require("./routes/transactions.routes")(app);
require("./routes/auth.routes")(app);


app.listen(port, () => {
    console.log(`server running on port : ${port}`);
});