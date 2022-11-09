const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');
const registerSchema = require("./model/register");


var app = express();
var connectUrl = 'mongodb+srv://Shaad:Vinove321@quiz.gal2t.mongodb.net/MyQuiz?retryWrites=true&w=majority'



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('images'))

mongoose.connect(connectUrl).then(res => console.log("mongo connected"))





//for registration and login ---------------------------------------------------

app.get('/api/users', async (req, res) => {

    Users.find((err, data) => {
        !err ? res.send(data) : res.send([])
    })

    // try {
    //     const users = await Users.find()
    //     res.json(users)
    // } catch (err) {
    //     res.send(err)
    // }
})

app.post("/api/users", async (req, res) => {

    Users.create(req.body, (err, data) => {
        !err ? res.send(data) : res.send([])
    })

    // try {
    //     const { email, password, name, number } = req.body

    //     const newUser = new Users({
    //         email: email,
    //         name: name,
    //         password: password,
    //         number: number
    //     })

    //     const user = await newUser.save()

    //     res.json(user)
    // } catch (err) {
    //     res.send(err)
    // }
})

//----------------------------------------------------------------

// for quiz ------------------------------------


app.get('/api/quiz', async (req, res) => {

    Questions.find((err, data) => {
        !err ? res.send(data) : res.send([])
    })

})

app.post("/api/quiz", async (req, res) => {

    Questions.create(req.body, (err, data) => {
        !err ? res.send(data) : res.send([])
    })

})

//----------------------------------------------------------------




// for selected answers ----------------------------------------------------

app.get('/api/result', async (req, res) => {

    UserAnswer.find((err, data) => {
        !err ? res.send(data) : res.send([])
    })

})

app.post("/api/result", async (req, res) => {
    console.log(req.body);
    UserAnswer.create(req.body, (err, data) => {
        console.log(data);
        !err ? res.send(data) : res.send([])
    })
})




//Login Token -------------------------------------------------------------

app.post('/loginData', (req, res) => {

    const data = req.body;

    const accessToken = jwt.sign({ id: data.id }, "mySecretKey", {
        expiresIn: "60s"
    });
    res.json({
        username: data.name,
        Token: accessToken
    })

    // res.send({ myData })
})





//verify ----------------------------------------------


app.post('/verify', (req, res) => {

    const data = req.body;
    console.log(data);
    // console.log(data, "login")
    // axios.post("http://localhost:8005/loginToken/", data)

    const accessToken = jwt.verify(data.token, "mySecretKey",
        (err, user) => {
            err ? res.send(false) : res.send(true);
        });
    // res.send({ myData })
})


//----------------------------------------------------------------

const port = 8000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// http://127.0.0.1:3000/data