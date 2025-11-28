#1. Lépés: BUILD
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

#2. Lépés: FUTTATÁS (Nginx webszerver)
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]