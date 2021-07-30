FROM node:10

WORKDIR /usr/src/app/app
COPY ./package.json ./
COPY ./yarn.lock ./

#RUN yarn install
#RUN yarn global add @vue/cli

EXPOSE 8080

CMD ["yarn", "serve"]