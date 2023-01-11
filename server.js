const express = require("express");

const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const Port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.listen(Port, () => console.log(`Listening on http://localhost:${Port}`));
