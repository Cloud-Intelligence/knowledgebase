FROM cypress/base:ubuntu19-node12.14.1

WORKDIR /usr/src/app/app
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install
RUN yarn run cypress install

EXPOSE 8080

CMD ["yarn", "serve"]
