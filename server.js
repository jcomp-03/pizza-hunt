const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));



mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pizza-hunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).catch((error) => {
  // listen for errors on initial connection
  console.log('***** Error on initial connection *****');
  console.log(error);
});

// listen for errors after initial connection is established
mongoose.connection.on('error', error => {
  console.log('***** Error after initial connection established *****');
  console.log(error);
});

// listen for disconnected event
mongoose.connection.on('disconnected', error => {
  console.log('***** Disconnected event *****');
  console.log(error);
});


// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`***** 🌍 Connected on localhost:${PORT} *****`));
