#!/bin/zsh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

cp ~/envs/todo ./backend/prisma/.env
cp ~/envs/todo_client ./client/.env

yarn

cd backend
yarn
yarn db:up
yarn build

cd ../client
yarn
yarn build

cd ..

git checkout .

yarn pm2 reload ecosystem.config.js --env production
