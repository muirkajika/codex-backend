# ---- Base Stage ----
# Using a specific Node.js 18 version for stability
FROM node:18.18.0-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
FROM base AS dependencies
# Copy package.json and the lock file
COPY package.json package-lock.json* ./
# Use 'npm ci' which is faster and safer for CI/CD environments
RUN npm ci --omit=dev

# ---- Build Stage ----
FROM base AS builder
COPY package.json package-lock.json* ./
# Install all dependencies, including devDependencies needed for building
RUN npm install
COPY . .
# Build the TypeScript project into JavaScript
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
# Copy the built application from the 'builder' stage
COPY --from=builder /usr/src/app/dist ./dist
# Copy the production node_modules from the 'dependencies' stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Expose the port the container will listen on
EXPOSE 3001
# Command to run the application
CMD ["node", "dist/main"]
