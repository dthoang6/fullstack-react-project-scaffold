# Base image for our image
FROM node:20

# Set the working directory, which is where all files of our service will be placed inside the image.

WORKDIR /app

# Copy the package.json and package-lock.json files from our project to the working directory
COPY package.json package-lock.json ./

# Run to install all dependencies in the image
RUN npm install

# Copy the rest of our application from the local file system to the Docker image
COPY . .

# Run our application
CMD ["npm", "start"]