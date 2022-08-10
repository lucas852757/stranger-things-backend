FROM node:14-alpine
WORKDIR /the/workdir/path
COPY package.json .
RUN npm install
COPY . .
CMD node start