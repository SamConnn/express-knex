FROM node:20
WORKDIR /app
COPY . .
RUN rm -rfv node_modules
RUN npm install
RUN npm run build
COPY package*.json ./
EXPOSE 8181
ENTRYPOINT ["npm", "run", "start"]