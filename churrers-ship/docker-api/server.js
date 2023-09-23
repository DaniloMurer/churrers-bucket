// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import Docker from 'dockerode'
const fastify = Fastify({
  logger: true
})
const docker = new Docker({socketPath: '/var/run/docker.sock'});

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

fastify.get('/docker-containers', async function handler(request, reply) {
  const containers = await getContainers();
  for (let container of containers) {
    delete container.Command;
    delete container.HostConfig;
    delete container.Labels;
    delete container.Mounts;
    delete container.NetworkSettings;
    delete container.Ports;
    delete container.Image;
    delete container.ImageID;
    delete container.Created;
  }
  return containers;
})


function getContainers() {
  return new Promise((resolve, reject) => {
    docker.listContainers(function (error, containers) {
      resolve(containers);
    });
  })
}

// Run the server!
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
}