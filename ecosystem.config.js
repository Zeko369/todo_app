const { config } = require('dotenv');
// config();

module.exports = {
  apps: [
    {
      name: 'Client',
      script: './client/node_modules/.bin/next',
      args: 'start ./client -p 2134',
      log_file: './logs/client.log',
      time: true,
    },
    {
      name: 'Server',
      script: 'node',
      args: './backend/dist/index.js',
      log_file: './logs/server.log',
      time: true,
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
        DATABASE_URL: 'postgresql://todo:foobar123@localhost:5432/todo_development?schema=public',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 2135,
        // DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
