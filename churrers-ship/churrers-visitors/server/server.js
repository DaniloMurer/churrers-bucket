// Import the framework and instantiate it
import Fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import cors from '@fastify/cors'
const fastify = Fastify({
  logger: true
})

fastify.register(mongodb, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb://database:27017/visitorsapp',
  authSource: 'admin',
  auth: {
    username: "root",
    password: "root"
  }
});

fastify.register(cors, {
  delegator: (req, callback) => {
    const corsOptions = {
        origin: true
    };
    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }
    callback(null, corsOptions);
  }
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const visitors = this.mongo.db.collection('visitors');

  return { visitors: (await visitors.find().sort({ timestamp: -1 }).toArray()).slice(0, 10) }
})

fastify.get('/countries', async function handler(request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return { countries: (await visitors.distinct('country'))}
})

fastify.get('/cities', async function handler(request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return { cities: (await visitors.distinct('city'))}
})

fastify.post('/', async function handler (request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return visitors.insertOne(Object.assign(request.body));  
})  

// Run the server!
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}