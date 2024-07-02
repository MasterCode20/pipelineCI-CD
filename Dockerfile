# Dockerfile
FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
package*.json ./
RUN npm install
# Bundle app source
. .
EXPOSE 3000
CMD [ "node", "app.js" ]