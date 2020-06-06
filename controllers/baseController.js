const { Router } = require('express');

const baseExclude = ['router', 'exclude', 'generateRoutes', 'getRouter', 'prefix', 'mount'];
const methods = ['get', 'post', 'put', 'patch', 'delete'];
const len = Math.max(...methods.map((a) => a.length));

class BaseController {
  exclude = [];
  id = '';
  prefix = '';
  router = undefined;

  constructor(prefix, id = ':id') {
    this.router = Router();
    this.prefix = prefix;
    this.id = id;

    this.generateRoutes = this.generateRoutes.bind(this);
    this.getRouter = this.getRouter.bind(this);
    this.mount = this.mount.bind(this);
  }

  mount(name, onId, controllerClass) {
    this._getFunctions(controllerClass).forEach(({ method, path, callback }) => {
      if (onId) {
        path = `${onId ? `/${this.id}` : ''}${name}` + path;
      }

      console.log(
        `${' '.repeat(len - method.length)}${method.toUpperCase()} ${this.prefix}${path}`
      );
      this.router[method](path, callback);
    });
  }

  _getFunctions(controller) {
    return Object.getOwnPropertyNames(controller)
      .filter((item) => ![...baseExclude, ...this.exclude].includes(item) && !item.startsWith('_'))
      .map((func) => {
        if (controller[func] && {}.toString.call(controller[func]) === '[object Function]') {
          const { route, callback } = controller[func]();
          const [method, path] = route.split(' ');

          return { method, path, callback };
        }

        return undefined;
      })
      .filter((a) => a !== undefined);
  }

  generateRoutes() {
    this._getFunctions(this).forEach(({ method, path, callback }) => {
      console.log(
        `${' '.repeat(len - method.length)}${method.toUpperCase()} ${this.prefix}${path}`
      );
      this.router[method](path, callback);
    });
  }

  getRouter() {
    this.generateRoutes();
    return this.router;
  }
}

module.exports = BaseController;
