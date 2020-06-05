const { Router } = require('express');

const baseExclude = ['router', 'exclude', 'generateRoutes', 'getRouter'];
const methods = ['get', 'post', 'put', 'patch', 'delete'];

class BaseController {
  exclude = [];
  router = undefined;

  constructor() {
    this.router = Router();
    this.generateRoutes = this.generateRoutes.bind(this);
    this.getRouter = this.getRouter.bind(this);
  }

  generateRoutes() {
    Object.getOwnPropertyNames(this)
      .filter((item) => ![...baseExclude, ...this.exclude].includes(item))
      .forEach((func) => {
        if (this[func] && {}.toString.call(this[func]) === '[object Function]') {
          const { path, method, callback } = this[func]();
          console.log(`Adding route: ${method.toUpperCase()} ${path}`);
          this.router[method](path, callback);
        }
      });
  }

  getRouter() {
    this.generateRoutes();
    return this.router;
  }
}

module.exports = BaseController;
