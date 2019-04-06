#!/bin/bash

git pull origin master
NODE_ENV=development yarn install
NODE_ENV=development sequelize db:migrate

cd frontend
NODE_ENV=development yarn install
NODE_ENV=development yarn build
