# build stage
FROM node:18.18.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Certbot stage
FROM certbot/certbot:latest as certbot-stage
RUN mkdir -p /var/www/certbot

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=certbot-stage /var/www/certbot /var/www/certbot
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
