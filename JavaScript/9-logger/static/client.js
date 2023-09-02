'use strict';

const PATH = 'ws://127.0.0.1:8001';

const routing = {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
};

const transport = {
  ws: (structure, url) => {
    const socket = new WebSocket(url);

    const api = {};
    const services = Object.keys(structure);
    for (const serviceName of services) {
      api[serviceName] = {};
      const service = structure[serviceName];
      const methods = Object.keys(service);
      for (const methodName of methods) {
        api[serviceName][methodName] = (...args) => new Promise((resolve) => {
          const packet = { name: serviceName, method: methodName, args };
          socket.send(JSON.stringify(packet));
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            resolve(data);
          };
        });
      }
    }
    return new Promise((resolve) => {
      socket.addEventListener('open', () => resolve(api));
    });
  },
  http: async (structure, url) => {
    const services = Object.keys(structure);
    const api = {};
    for await (const serviceName of services) {
      api[serviceName] = {};
      const service = structure[serviceName];
      const methods = Object.keys(service);
      for (const method of methods) {
        api[serviceName][method] = async (...args) => {
          const res = await fetch(`${url}/${serviceName}/${method}/${args}`);
          const data = await res.json();
          return data;
        };
      }
    }
    return api;
  }
};


const scaffold = (url) => {
  const protocol = url.startsWith('http') ? 'http' : 'ws';
  return (strucrure) => transport[protocol](strucrure, url);
};

(async () => {
  const api = await scaffold(PATH)(routing);

  const data = await api.user.read();
  console.log({ data });
})();
