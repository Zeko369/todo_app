#!/bin/sh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

cp ~/envs/.todo .env
cp ~/envs/.todo_client ./client/.env

yarn

cd backend
yarn
yarn db:migrate
yarn build

cd ../client
yarn
yarn build

cd ..

pm2 reload ecosystem.config.js --env production