# Dockerfile for React client

# Build react client
FROM node:16.0.0-alpine as build-stage

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'