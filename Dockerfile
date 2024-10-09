# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the backend's package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Build the frontend React app
RUN cd frontend && npm install && npm run build

# Expose the backend's port
EXPOSE 5000

# Start the Node.js backend server
CMD ["node", "index.js"]
