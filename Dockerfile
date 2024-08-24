# Use the official Node.js image as the base image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the NestJS application
RUN npm run build

# Use a smaller Node.js image to run the application
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy only the built application and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

# Expose the port on which the app will run
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main.js"]
