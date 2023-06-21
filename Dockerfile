FROM node:18-alpine

ENV NODE_VERSION 18.16.0
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
CMD ["node", "./dist/main.js"]