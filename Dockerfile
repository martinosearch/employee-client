# Client App
FROM node:18.7.0-alpine as builder
WORKDIR /app
ADD package*.json ./
RUN apk update && apk add bash
RUN npm install
COPY . .

#RUN npm run-script build
RUN npm run build

# CMD [ "npm", "start"]

FROM nginx:alpine
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=builder app/dist/employee-client usr/share/nginx/html
