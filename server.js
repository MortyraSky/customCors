// сервер на чистом nodeJS
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// сервер на expressJS
let values = [{
        id: 123456,
        message: 'THIS IS parta',
        name: "parta"
    },
    {
        id: 789000,
        message: 'THIS IS bear',
        name: "bear"
    },
    {
        id: 999999,
        message: 'THIS IS public',
        name: "public"
    },
    {
        id: 454566,
        message: 'THIS IS sparta',
        name: "sparta"
    },
    {
        id: 878667,
        message: 'THIS IS doska',
        name: "doska"
    },
    {
        id: 999888,
        message: 'THIS IS protected',
        name: "protected"
    },
    {
        id: 100456,
        message: 'THIS IS etc....',
        name: "etc"
    },
    {
        id: 789987,
        message: 'THIS IS puppy',
        name: "puppy"
    },
    {
        id: 666999,
        message: 'THIS IS private',
        name: "puprivateblic"
    },
    {
        id: 566455,
        message: 'THIS IS bearss',
        name: "bear"
    },
    {
        id: 777777,
        message: 'THIS IS joska',
        name: "da, eto joska"
    },
    {
        id: 999888,
        message: 'THIS IS default',
        name: "default"
    },
    {
        id: 112233,
        message: 'THIS IS shine',
        name: "shine"
    }
];
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const sessionOptions = {
    secret: '123456',
    cookie: {
        maxAge: 26999999999999
    },
    saveUninitialized: true,
    resave: true
};

app.use(session(sessionOptions));

app.get('/', (request, response) => {
    response.send('Hello from Express!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log("something bad happened, err");
    }
    console.log(`server is listening on ${port}`);
});

app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.send('ok');
});
app.get('/public', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.send(JSON.stringify({
        message: 'This is public info'
    }));
});

app.post('/login', function (req, res) {
    if (req.body.password === 'secret') {
        req.session.loggedIn = true;
        res.send('You are now logged in!');
    } else {
        res.send('Wrong password.');
    }
});

app.get('/private', function (req, res) {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.set('Access-Control-Allow-Credentials', 'true');
    req.session.loggedIn = true;
    if (req.session.loggedIn === true) {
        res.send(JSON.stringify(values));
    } else {
        res.send(JSON.stringify({
            message: 'Please login first'
        }));
    }
});