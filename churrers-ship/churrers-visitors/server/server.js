// Import the framework and instantiate it
import Fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import cors from '@fastify/cors'
import Docker from 'dockerode'
const fastify = Fastify({
  logger: true
})
const docker = new Docker({socketPath: '/var/run/docker.sock'});
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

fastify.post('/docker-containers/create', async function(request, reply) {
  const containerConfig = {
    // "AttachStdin": false,
    // "AttachStdout": true,
    // "AttachStderr": true,
    // "Tty": false,
    // "OpenStdin": false,
    // "StdinOnce": false,
    "Env": [
      "FOO=bar",
      "BAZ=quux"
    ],
    "Cmd": request.body.Cmd,
    // "Entrypoint": request.body.Entrypoint,
    "Image": request.body.Image,
    // "Labels": {
    //   "com.example.vendor": "Acme",
    //   "com.example.license": "GPL",
    //   "com.example.version": "1.0"
    // },
    // "Volumes": {
    //   "/volumes/data": { }
    // },
    "WorkingDir": "",
    "NetworkDisabled": false,
    // "ExposedPorts": {
    //   "22/tcp": { }
    // },
    "StopSignal": "SIGTERM",
    "StopTimeout": 10,
    // "HostConfig": {
    //   "Binds": [],
    //   "Links": [],
    //   "Memory": 0,
    //   "MemorySwap": 0,
    //   "MemoryReservation": 0,
    //   "KernelMemory": 0,
    //   "NanoCpus": 500000,
    //   "CpuPercent": 80,
    //   "CpuShares": 512,
    //   "CpuPeriod": 100000,
    //   "CpuRealtimePeriod": 1000000,
    //   "CpuRealtimeRuntime": 10000,
    //   "CpuQuota": 50000,
    //   "CpusetCpus": "0,1",
    //   "CpusetMems": "0,1",
    //   "MaximumIOps": 0,
    //   "MaximumIOBps": 0,
    //   "BlkioWeight": 300,
    //   "BlkioWeightDevice": [],
    //   "BlkioDeviceReadBps": [],
    //   "BlkioDeviceReadIOps": [],
    //   "BlkioDeviceWriteBps": [],
    //   "BlkioDeviceWriteIOps": [],
    //   "MemorySwappiness": 60,
    //   "OomKillDisable": false,
    //   "OomScoreAdj": 500,
    //   "PidMode": "",
    //   "PidsLimit": -1,
    //   "PortBindings": {},
    //   "PublishAllPorts": false,
    //   "Privileged": false,
    //   "ReadonlyRootfs": false,
    //   "Dns": [],
    //   "DnsOptions": [],
    //   "DnsSearch": [],
    //   "VolumesFrom": [],
    //   "CapAdd": [],
    //   "CapDrop": [],
    //   "GroupAdd": [],
    //   "RestartPolicy": {},
    //   "AutoRemove": true,
    //   "NetworkMode": "bridge",
    //   "Devices": [ ],
    //   "Ulimits": [],
    //   "LogConfig": {},
    //   "SecurityOpt": [ ],
    //   "StorageOpt": { },
    //   "CgroupParent": "",
    //   "VolumeDriver": "",
    //   "ShmSize": 67108864
    // },
    // "NetworkingConfig": {
    //   "EndpointsConfig": {}
    // }
  }
  // We need to pull image because it will not be done automatically on while creating the container
  // await pullImage(containerConfig.Image);
  // const container = await createContainer(containerConfig);
  // container.start();
  // const newContainer = container.inspect();
  // delete newContainer.Command;
  // delete newContainer.HostConfig;
  // delete newContainer.Labels;
  // delete newContainer.Mounts;
  // delete newContainer.NetworkSettings;
  // delete newContainer.Ports;
  // delete newContainer.Image;
  // delete newContainer.ImageID;
  // delete newContainer.Created;
  // return newContainer;
  return "";
})

function createContainer(containerConfig) {
  return new Promise((resolve, reject) => {
        resolve(docker.createContainer(containerConfig))
      }
  )
}

fastify.post('/', async function handler (request, reply) {
  const visitors = this.mongo.db.collection('visitors');
  return visitors.insertOne(Object.assign(request.body));  
})

fastify.post('/messages', async function handler (request, reply) {
  const messages = this.mongo.db.collection('messages');
  return messages.insertOne(Object.assign(request.body));
});

fastify.get('/messages', async function handler(request, reply) {
  const messages = this.mongo.db.collection('messages');
  const foundMessages = (await messages.find().sort({ timestamp: -1 }).toArray()).slice(0, 10);
  return { messages: foundMessages };
})
function getContainers() {
  return new Promise((resolve, reject) => {
    docker.listContainers(function (error, containers) {
      resolve(containers);
    });
  })
}

function getImages() {
  return new Promise((resolve, reject) => {
    docker.listImages(function (error, images) {
      resolve(images);
    })
  })
}

function pullImage(image) {
  return new Promise((resolve, reject) => {
    docker.pull(image, function (error, stream) {
      docker.modem.followProgress(stream, onFinished, onProgress);
      function onFinished(err, output) {
        resolve(output);
      }
      function onProgress(event) {
        //nothing happens here
      }
    });
  });
}

function getContainer(containerId) {
  return new Promise((resolve, reject) => {
    resolve(docker.getContainer(containerId))
  })
}

// Run the server!
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
}