const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const request = require('request');

const loginRouter = require('./routes/login.routes');
const projectRouter = require('./routes/project.routes');
const typeOfProjectRouter = require('./routes/typeOfProject.routes');
const imageRouter = require('./routes/image.routes');
const userRouter = require('./routes/user.routes');

const buildDirectory = path.join(__dirname, './build');
const credentials = require('fs').existsSync(
  path.join(__dirname, './helpers/viewer.credentials.js')
)
  ? require('./helpers/viewer.credentials')
  : (console.log(
      'No credentials.js file present, assuming using FORGE_CLIENT_ID & FORGE_CLIENT_SECRET system variables.'
    ),
    require('./helpers/viewer.credentials'));

const { mongoConnect } = require('./config/connect');

const port = process.env.PORT;
const app = express();

mongoConnect();

app.use(express.static(buildDirectory));

app.get('/', function (req, res) {
  res.sendFile(`${buildDirectory}/index.html`);
});
app.get('/token', function (req, res) {
  request.post(
    credentials.Authentication,
    { form: credentials.credentials },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    }
  );
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/login', loginRouter);
app.use('/project', projectRouter);
app.use('/typeOfProject', typeOfProjectRouter);
app.use('/image', imageRouter);
app.use('/user', userRouter);

const server = app.listen(port);
