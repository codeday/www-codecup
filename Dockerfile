# Use NodeJS Alpine
FROM node:current-alpine

# Create a system user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
ENV NODE_ENV=production
RUN npm install --ignore-scripts

# Build frontend
RUN npm run build

# Switch to the nextjs user
USER nextjs

# Expose NextJS (HTTP)
EXPOSE 3000

# Disable NextJS telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Start NextJS via NPM
CMD ["npm", "run", "start"]