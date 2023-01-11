// require express
const express = require("express");

// url to routes
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");


const app = express();

// port for deployment on heroku
const Port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.listen(Port, () => console.log(`Listening on http://localhost:${Port}`));
