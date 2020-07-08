#!/bin/bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

git checkout .
git pull origin master
NODE_ENV=development yarn install
NODE_ENV=development sequelize db:migrate

cd frontend
NODE_ENV=development yarn install
NODE_ENV=development yarn build
