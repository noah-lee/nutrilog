# Build Stage
FROM node:22-alpine as builder
WORKDIR /app
# Environment variable from docker compose defined at build time (needed for Vite)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL 
COPY package*.json . 
RUN npm install
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]