// Import the framework and instantiate it
import Fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import cors from '@fastify/cors'
import Docker from 'dockerode'
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
  const foundVisitors = (await visitors.find().sort({ timestamp: -1 }).toArray()).slice(0, 10);
  for (let foundVisitor of foundVisitors) {
    foundVisitor.icon = `https://flagcdn.com/${foundVisitor.countryIso.toLowerCase()}.svg`;
  }
  return { visitors:  foundVisitors}
})

fastify.get('/countries', async function handler(request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return { countries: (await visitors.distinct('country'))}
})

fastify.get('/cities', async function handler(request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return { cities: (await visitors.distinct('city'))}
})

fastify.get('/docker-containers', async function handler(request, reply) {
  const docker = new Docker({socketPath: '/var/run/docker.sock'});
  const blah = await docker.listContainers(function (error, containers) {
    return containers;
  });
  console.log(blah[0]);
  return blah;
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