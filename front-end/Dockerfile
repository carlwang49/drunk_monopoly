# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for the application
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which the application will run (default for React is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
