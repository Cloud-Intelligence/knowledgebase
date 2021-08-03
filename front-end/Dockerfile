FROM  cypress/browsers:node14.17.0-chrome91-ff89

WORKDIR /usr/src/app/app
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install
RUN yarn run cypress install

EXPOSE 8080

CMD ["yarn", "serve"]
