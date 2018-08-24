FROM node:alpine
WORKDIR /cronflow
COPY package.json .
RUN npm i
COPY . .
CMD [ "node", "dist/index.js" ]