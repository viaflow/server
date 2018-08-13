FROM node:alpine
WORKDIR /cronflow
COPY package.json .
RUN npm run taobao
COPY . .
CMD [ "node", "--max-old-space-size=1900", "bin/www" ]