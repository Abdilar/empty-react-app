# Step 1

FROM node:10-alpine as build-step
RUN apk add g++ make python
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build:development
# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
