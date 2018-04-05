FROM node:8

MAINTAINER Koki Hayashi

WORKDIR $HOME/app

COPY . .

RUN npm install
RUN npm install -g webpack@2
RUN npm install -g flow-typed
Run npm rebuild node-sass

RUN flow-typed install --skip
RUN webpack

EXPOSE 3010

ENV NODE_ENV=production
ENTRYPOINT ["npm", "start"]
