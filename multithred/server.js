
const { Worker } = require('worker_threads');
const http = require('http');


const worker = new Worker('./worker.js');


worker.on('message', (data) => {
  console.log('Received data from worker:', data);
});



worker.on('error', (err) => {
  console.error('Worker error:', err);
});

worker.on('exit', (code) => {
  if (code !== 0) console.error(`Worker exited with code ${code}`);
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Main server is running');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
