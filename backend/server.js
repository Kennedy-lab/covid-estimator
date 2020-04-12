import { createServer } from 'http';

const server = createServer((req, res) => {
  res.end('This is my server response!');
});


server.listen(process.env.PORT || 3000);
