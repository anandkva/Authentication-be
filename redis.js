const redis = require('redis');

const redisClient = () => {
  return redis.createClient({
    host: 'red-ck1umpfhdsdc738g8gp0', // Remove the "redis://" prefix
    port: 6379,
  });
};

const client = redisClient();

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('end', () => {
  console.log('Redis connection ended');
});

// Gracefully handle termination signals (e.g., Ctrl+C)
process.on('SIGINT', () => {
  client.quit(() => {
    console.log('Redis connection closed gracefully');
    process.exit();
  });
});

// Export the Redis client
module.exports = client;
