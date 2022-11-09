require('dotenv').config();
const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const authToken = require('./middleware/token');
const users = require('./routers/routes')
const app = express();

app.use(express.json());

app.use('/users', users);

app.listen(3000);