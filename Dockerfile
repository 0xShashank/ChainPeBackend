FROM node:16-alpine
COPY . .

RUN npm run build

# EXPOSE 8080/tcp
EXPOSE 443/tcp
CMD npm run server

