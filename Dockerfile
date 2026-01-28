# The image to use
FROM node:25

# The working directory
WORKDIR /app

# The dependencies to install
# Looks for package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# The rest of the app
# Copying into the container
COPY . ./

# The port used for the app
# Exposes the port to access it
EXPOSE 5173

# Command to run the app
# CMD [ "npm", "start" ]
CMD [ "npm", "run", "dev" ]