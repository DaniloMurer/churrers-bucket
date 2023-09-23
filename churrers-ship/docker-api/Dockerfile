FROM node:18.13.0-alpine

COPY ../churrers-visitors/server .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]