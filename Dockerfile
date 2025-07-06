# ---- Base Stage ----
# A stable, specific version of Node.js
FROM node:18.18.0-alpine AS base
WORKDIR /usr/src/app
# Set the NPM log level to warn to reduce noise in logs
ENV NPM_CONFIG_LOGLEVEL warn

# ---- Dependencies Stage ----
# This stage is for installing ALL dependencies needed for building
FROM base AS dependencies
COPY package.json package-lock.json* ./
# Install ALL dependencies (including devDependencies)
RUN npm install

# ---- Build Stage ----
# This stage builds the TypeScript code into JavaScript
FROM dependencies AS builder
# We already have all node_modules from the 'dependencies' stage
# so we just need to copy the source code
COPY . .
# Run the build command, which requires devDependencies
RUN npm run build

# ---- Production Dependencies Stage ----
# This stage creates a clean install of ONLY production dependencies
FROM base AS prod-deps
COPY package.json package-lock.json* ./
# Use 'npm ci' to install only production modules
RUN npm ci --omit=dev

# ---- Production Release Stage ----
# This is the final, lean image that will be deployed
FROM base AS release
# Copy the compiled code from the 'builder' stage
COPY --from=builder /usr/src/app/dist ./dist
# Copy the clean production node_modules from the 'prod-deps' stage
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
# Expose the port the container will listen on
EXPOSE 3001
# Command to run the application
CMD ["node", "dist/main"]
