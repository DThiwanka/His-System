const { parentPort } = require('worker_threads');

async function fetchData() {
  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://catfact.ninja/fact');
    const data2 = await response.json();
    console.log('Fetched Data:', data2);
    parentPort.postMessage(data2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

setInterval(fetchData, 2000);
