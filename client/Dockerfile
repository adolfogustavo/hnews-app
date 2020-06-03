# Dockerfile for client

# Stage 1: Build react client
FROM node:current-alpine

WORKDIR /usr/src/app

COPY package*.json ./
ADD package.json /usr/src/app/package.json

# Install dependencies
RUN npm config set package-lock false
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]
