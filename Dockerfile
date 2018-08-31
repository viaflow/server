FROM node:alpine
RUN apk add git --update-cache --repository https://mirrors.aliyun.com/alpine/latest-stable/main/ --allow-untrusted
WORKDIR /cronflow
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
CMD [ "npm", "start" ]