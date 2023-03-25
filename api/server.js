const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 3000;


let corsOptions = {
  origin: constants.clientUrl
};
app.get("/", (req, res) => {
    res.send("hello world");
});

app.use(cors(corsOptions));

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


app.listen(port, () => {
    console.log(`server running on port : ${port}`);
});