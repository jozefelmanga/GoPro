var express = require("express");
const projectRoutes=require('./routes/projectRoutes')
const userRoutes=require('./routes/userRoutes')
const tacheRoutes=require('./routes/tacheRoutes')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors=require('cors')
dotenv.config();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use('/projet', projectRoutes);
app.use('/user', userRoutes);
app.use('/tache', tacheRoutes);

app.listen(process.env.port, () => {
  console.log("listening on port 3001");
});
