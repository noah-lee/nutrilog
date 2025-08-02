# Build Stage
FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json . 
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
