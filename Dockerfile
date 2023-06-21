FROM alpine:3.17

ENV NODE_VERSION 18.16.0
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]