## FOR INDEX

# FROM node:17


# # WORKING DIR
# WORKDIR /

# # COPY PKG JSON
# COPY package*.json ./

# # INSTALL FILES
# RUN npm install

# # COPY SOURCE FILES
# COPY . .

# # BUILD
# # RUN npm run build

# # EXPOSE API PORT
# EXPOSE 8080

# CMD [ "npm","start" ]






## FOR WORKER
FROM node:17


# WORKING DIR
WORKDIR /

# COPY PKG JSON
COPY package*.json ./

# INSTALL FILES
RUN npm install

# COPY SOURCE FILES
COPY . .

# BUILD
# RUN npm run build

# EXPOSE API PORT
EXPOSE 4000

CMD [ "npm","start" ]