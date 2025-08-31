const Ajv = require("ajv");
const ajv = new Ajv();
module.exports = (app) => {
  const $schema = "http://json-schema.org/draft-07/schema#";
  return async (ctx, next) => {
    if (ctx.path.indexOf("api") < 0) {
      return await next();
    }

    const { query, body, headers } = ctx.request;
    const { params, path, method } = ctx;
    console.log(app, app.routerSchema, "routerSchema");
    const schema = app.routerSchema[path][method.toLowerCase()];

    if (!schema) {
      return await next();
    }

    let valid = true;

    let validate;
    //校验headers
    if (valid && headers && schema.headers) {
      schema.headers.$schema = $schema;
      validate = ajv.compile(schema.headers);
      valid = validate(headers);
    }

    if (valid && query && schema.query) {
      schema.query.$schema = $schema;
      validate = ajv.compile(schema.query);
      valid = validate(query);
    }

    if (valid && body && schema.body) {
      schema.body.$schema = $schema;
      validate = ajv.compile(schema.body);
      valid = validate(body);
    }

    if (!valid) {
      ctx.status = 200;
      ctx.body = {
        message: "Invalid request parameters" + JSON.stringify(validate.errors),
      };
      return;
    }

    await next();
  };
};
