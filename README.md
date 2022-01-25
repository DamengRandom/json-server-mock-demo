### JSON Server Quick Demo

- One of most common ways to build mock API data is using `json server`

Why? 
  - It's a handy tool which is also quite fast to be setup
  - When you need quickly setup a mock API (like an interview)

#### All we need to do to setup a json server (Static way)

```js
// Setup a db.json file and put some data, like below
{
  "users": [
    {
      "id": 1,
      "name": "Damon"
    },
    {
      "id": 2,
      "name": "Ella"
    }
  ],
  "repositories": [
    {
      "id": 1,
      "url": "https://github.com/damengrandom/react-recalls",
      "userId": 1
    },
    {
      "id": 2,
      "url": "https://github.com/damengrandom/react-notes",
      "userId": 1
    }
  ]
}

// Then, run the command
npx json-server --watch db.json

// Now you are good to go 🚀🚀🚀🚀
```


#### Urls attach with relationship

- We can get repositories related data with users: `http://localhost:3000/repositories?_expand=user`

- We can get each user with its corresponding repositories: http://localhost:3000/users?_embed=repositories

- If we need to create some mock data, we can do it via postman or insomnia, like: `POST` http://localhost:3000/users, then we can get db.json updated !! Same thing we can do CRUD as simple as you go !! 



#### All we need to do to setup a json server (Dynamic way)

```js
// Setup a db.json file and put some data, like below
{
  "users": [
    {
      "id": 1,
      "name": "Damon"
    },
    {
      "id": 2,
      "name": "Ella"
    }
  ],
  "repositories": [
    {
      "id": 1,
      "url": "https://github.com/damengrandom/react-recalls",
      "userId": 1
    },
    {
      "id": 2,
      "url": "https://github.com/damengrandom/react-notes",
      "userId": 1
    }
  ]
}

// set up a server.js file (Like a express server file)
yarn init -y
yarn add --dev json-server
touch server.js

// Inside server.js do following code:
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults();

// server
server.use(jsonServer.bodyParser);
server.use(middleware);
server.use((req, res, next) => {
  if(req.path.startsWith('/users') && req.headers['authorization'] !== 'Bearer abcd') {
    return res.status(401).json({ error: 'Must have Bearer token setup' });
  }

  next();
});
server.use(router);
server.listen(3000, () => {
  console.log('Server is up and running ..');
});

// Finally, run your server locally by:
npx nodemon server.js
```

- As you can see, above server.js is more powerful because you can do some customized API prototypes, like `API request requires a bearer token` [From line 97 - 102]


Thanks for reading 🤗 ~~
