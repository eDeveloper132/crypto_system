"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _jsonwebtoken = require('jsonwebtoken');





 function ensureAuthenticated(
  request,
  response,
  next
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      error: "Token invalid",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = _jsonwebtoken.verify.call(void 0, token, process.env.JWT_SECRET) ;
    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ error: "Token expired" });
  }
} exports.ensureAuthenticated = ensureAuthenticated;
