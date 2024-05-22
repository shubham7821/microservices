# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) from your project into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# If using Yarn, uncomment the following line and comment out the npm install line above
# RUN yarn install

# Copy the rest of your application's source code from your project into the working directory
COPY . .

# Build the application using the Nest CLI
RUN npm run build

# Your application binds to port 4000, make sure the container listens on this port at runtime.
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start:prod"]
