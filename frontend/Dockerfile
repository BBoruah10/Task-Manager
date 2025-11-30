# ---------- Build Stage ----------
FROM node:22-alpine AS build   

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source and build
COPY . .
RUN npm run build

# ---------- Run Stage ----------
FROM nginx:alpine

# clean default html
RUN rm -rf /usr/share/nginx/html/*

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
