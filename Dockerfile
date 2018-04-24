FROM node:alpine
WORKDIR /cronflow
COPY package.json .
RUN npm i --registry=https://registry.npm.taobao.org
COPY . .
CMD [ "node", "--max-old-space-size=1900", "bin/www" ]