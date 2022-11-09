// const express = require('express');
// const app = express();

import * as express from 'express';
import { Auth } from '../config/authMiddleware';
import UserRouter from './UserRouter';

const Routes=() => {
    
        const router = express.Router();

        app.use('/', router);
        app.get('/',(req, res) =>{
            res.writeHead(200, { 'Content-Type':'text/html'});
            res.end("<div><p><h3>Server is working fine at : 3011</h3><p></div>");        
        })
        // users
        app.use('/users', UserRouter);

        //Static folder
        app.use('/', express.static('public'))

}


// const express = require('express');
// const authToken = require('../middleware/token')
// const router = express.Router()

// const {
//     getUser,
//     getUserPost,
//     createUser,
//     loginUser
// } = require('../controller/user');

// router.route('/').get(getUser).post(createUser)
// router.route('/posts').get(authToken, getUserPost)
// router.route('/login').post(loginUser)

// module.exports = router