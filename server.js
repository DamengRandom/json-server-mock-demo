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
