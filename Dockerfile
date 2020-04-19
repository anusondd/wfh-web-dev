### STAGE 1: Setup ###

FROM node:10 as builder

ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

RUN npm install @angular/cli

COPY / /usr/src/app

RUN cd /usr/src/app

RUN rm -rf /node_modules

RUN rm -rf /dist

RUN npm install

# RUN ng serve --host 0.0.0.0

RUN npm run build

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]