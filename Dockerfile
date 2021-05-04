# Build container
FROM node:current-alpine as build

# Working directory
WORKDIR /src

# Copy source code
COPY . .

# Install dependencies
ENV NODE_ENV=production
RUN npm install

# Build frontend
RUN npm run build

# Server container
FROM caddy:alpine

# Create a system user
RUN addgroup -S node && adduser -S node -G node

# Working directory
WORKDIR /var/www

# Copy the frontend
COPY --chown=node:node --from=build /src/build .

# Copy the Caddy config
COPY Caddyfile /etc/caddy

# Configure Caddy
ENV STATIC=/var/www

# Expose HTTP
EXPOSE 80

# Start caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]