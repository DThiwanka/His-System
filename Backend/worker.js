const { parentPort } = require('worker_threads');

async function fetchData() {
  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://my-json-server.typicode.com/typicode/demo/db');
    const data = await response.json();
    console.log('Fetched Data:', data);
    parentPort.postMessage(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

setInterval(fetchData, 2000);
