const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

// Function to get a Redis configuration parameter
async function getConfigParameter(parameterName) {
  try {
    const result = await redis.config('GET', parameterName);
    console.log(`Value of ${parameterName}:`, result[1]);
  } catch (error) {
    console.error('Error getting configuration parameter:', error);
  }
}

// Function to set a Redis configuration parameter
async function setConfigParameter(parameterName, value) {
  try {
    await redis.config('SET', parameterName, value);
    console.log(`Set ${parameterName} to ${value}`);
  } catch (error) {
    console.error('Error setting configuration parameter:', error);
  }
}

// Example usage
(async () => {
  await getConfigParameter('maxmemory');
  await setConfigParameter('maxmemory', '10000000'); // Set maxmemory to 10 megabytes
  await getConfigParameter('maxmemory');
  
  // Remember to quit the Redis connection when done
  redis.quit();
})();
