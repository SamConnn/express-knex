FROM node:18.12.1-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
RUN rm -rfv node_modules
RUN yarn
RUN yarn build
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY package*.json ./
EXPOSE 8080
ENTRYPOINT ["yarn", "run", "start"]