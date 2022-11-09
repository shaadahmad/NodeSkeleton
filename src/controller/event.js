require('dotenv').config();
let s = process.env.SECRET_KEY


// const LoginDetail =(req, res) => {

    

// }


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(express.json());

const posts = [
    {
        username: 'Kamal',
        title: 'Post 1'
    },
    {
        username: 'Raman',
        title: 'post 2'
    },
    {
        username: 'shivam',
        title: 'post 3'
    }
]

const users = []


// app.get 
const getUser = ((req, res) => {
    res.json(users)
})

// app.get
const getUserPost = ((req, res) => {
    // console.log(req.user.name);
    const data = posts.filter(post => post.username === req.user.name)
    console.log(data);
    if (data.length > 0) {
        res.json({ data: data });
    }
    else {
        res.send('user has not posted any thing');
    }
})



// app.post
const createUser = (async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(req.body.password, salt);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        // console.log(hashPassword);
        const user = { name: req.body.name, password: hashPassword }
        users.push(user)
        res.status(201).send("user successfully created");
    } catch (error) {
        console.log(error);
    }
})

// app.post
const loginUser = (async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const username = req.body.name
            const user = { name: username }

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken })
            // res.send('Success')
        } else {
            res.send("Not Allowed");
        }
    } catch {
        res.status(500).send();
    }
})

module.exports = {
    getUser,
    getUserPost,
    createUser,
    loginUser
}