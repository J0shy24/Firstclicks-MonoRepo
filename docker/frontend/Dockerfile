
FROM node:20 as build-stage

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm i angular-code-input

RUN npm install -g ng-openapi-gen

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY default.conf /etc/nginx/conf.d/default.conf

RUN rm /usr/share/nginx/html/index.html

COPY --from=build-stage /app/dist/daisy-ui/browser /usr/share/nginx/html

EXPOSE 80
EXPOSE 4200