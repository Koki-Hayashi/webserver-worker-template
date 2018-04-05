#!/bin/bash

if [ "$NODE_ENV" = "production" ]; then
  node ./server.js;
else
  nodemon ./server.js;
fi