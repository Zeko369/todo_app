const { Router } = require('express');

const baseExclude = ['router', 'exclude', 'generateRoutes', 'getRouter', 'prefix'];
const methods = ['get', 'post', 'put', 'patch', 'delete'];
const len = Math.max(...methods.map((a) => a.length));

class BaseController {
  exclude = [];
  prefix = '';
  router = undefined;

  constructor(prefix) {
    this.router = Router();
    this.prefix = prefix;

    this.generateRoutes = this.generateRoutes.bind(this);
    this.getRouter = this.getRouter.bind(this);
  }

  generateRoutes() {
    Object.getOwnPropertyNames(this)
      .filter((item) => ![...baseExclude, ...this.exclude].includes(item))
      .forEach((func) => {
        if (this[func] && {}.toString.call(this[func]) === '[object Function]') {
          const { route, callback } = this[func]();
          const [method, path] = route.split(' ');

          console.log(
            `${' '.repeat(len - method.length)}${method.toUpperCase()} ${this.prefix}${path}`
          );
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
