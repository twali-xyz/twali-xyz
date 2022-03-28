'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var manifest = require('./manifest.json');
var RoutesManifestJson = require('./routes-manifest.json');
var Stream = require('stream');
var zlib = require('zlib');
var http = require('http');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var manifest__default = /*#__PURE__*/_interopDefaultLegacy(manifest);
var RoutesManifestJson__default = /*#__PURE__*/_interopDefaultLegacy(RoutesManifestJson);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

const specialNodeHeaders = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];

const readOnlyCloudFrontHeaders = {
  "accept-encoding": true,
  "content-length": true,
  "if-modified-since": true,
  "if-none-match": true,
  "if-range": true,
  "if-unmodified-since": true,
  "transfer-encoding": true,
  via: true
};

const HttpStatusCodes = {
  202: "Accepted",
  502: "Bad Gateway",
  400: "Bad Request",
  409: "Conflict",
  100: "Continue",
  201: "Created",
  417: "Expectation Failed",
  424: "Failed Dependency",
  403: "Forbidden",
  504: "Gateway Timeout",
  410: "Gone",
  505: "HTTP Version Not Supported",
  418: "I'm a teapot",
  419: "Insufficient Space on Resource",
  507: "Insufficient Storage",
  500: "Server Error",
  411: "Length Required",
  423: "Locked",
  420: "Method Failure",
  405: "Method Not Allowed",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  207: "Multi-Status",
  300: "Multiple Choices",
  511: "Network Authentication Required",
  204: "No Content",
  203: "Non Authoritative Information",
  406: "Not Acceptable",
  404: "Not Found",
  501: "Not Implemented",
  304: "Not Modified",
  200: "OK",
  206: "Partial Content",
  402: "Payment Required",
  308: "Permanent Redirect",
  412: "Precondition Failed",
  428: "Precondition Required",
  102: "Processing",
  407: "Proxy Authentication Required",
  431: "Request Header Fields Too Large",
  408: "Request Timeout",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  416: "Requested Range Not Satisfiable",
  205: "Reset Content",
  303: "See Other",
  503: "Service Unavailable",
  101: "Switching Protocols",
  307: "Temporary Redirect",
  429: "Too Many Requests",
  401: "Unauthorized",
  422: "Unprocessable Entity",
  415: "Unsupported Media Type",
  305: "Use Proxy"
};

const toCloudFrontHeaders = (headers, headerNames, originalHeaders) => {
  const result = {};

  Object.entries(originalHeaders).forEach(([headerName, headerValue]) => {
    result[headerName.toLowerCase()] = headerValue;
  });

  Object.entries(headers).forEach(([headerName, headerValue]) => {
    const headerKey = headerName.toLowerCase();
    headerName = headerNames[headerKey] || headerName;

    if (readOnlyCloudFrontHeaders[headerKey]) {
      return;
    }

    result[headerKey] = [];

    if (headerValue instanceof Array) {
      headerValue.forEach((val) => {
        if (val) {
          result[headerKey].push({
            key: headerName,
            value: val.toString()
          });
        }
      });
    } else {
      if (headerValue) {
        result[headerKey].push({
          key: headerName,
          value: headerValue.toString()
        });
      }
    }
  });

  return result;
};

const isGzipSupported = (headers) => {
  let gz = false;
  const ae = headers["accept-encoding"];
  if (ae) {
    for (let i = 0; i < ae.length; i++) {
      const { value } = ae[i];
      const bits = value.split(",").map((x) => x.split(";")[0].trim());
      if (bits.indexOf("gzip") !== -1) {
        gz = true;
      }
    }
  }
  return gz;
};

const defaultOptions = {
  enableHTTPCompression: false
};

const handler$1 = (
  event,
  { enableHTTPCompression, rewrittenUri } = defaultOptions
) => {
  const { request: cfRequest, response: cfResponse = { headers: {} } } = event;

  const response = {
    headers: {}
  };

  const newStream = new Stream__default["default"].Readable();

  const req = Object.assign(newStream, http__default["default"].IncomingMessage.prototype);
  req.url = rewrittenUri || cfRequest.uri;
  req.method = cfRequest.method;
  req.rawHeaders = [];
  req.headers = {};
  req.connection = {};

  if (cfRequest.querystring) {
    req.url = req.url + `?` + cfRequest.querystring;
  }

  const headers = cfRequest.headers || {};

  for (const lowercaseKey of Object.keys(headers)) {
    const headerKeyValPairs = headers[lowercaseKey];

    headerKeyValPairs.forEach((keyVal) => {
      req.rawHeaders.push(keyVal.key);
      req.rawHeaders.push(keyVal.value);
    });

    req.headers[lowercaseKey] = headerKeyValPairs[0].value;
  }

  req.getHeader = (name) => {
    return req.headers[name.toLowerCase()];
  };

  req.getHeaders = () => {
    return req.headers;
  };

  if (cfRequest.body && cfRequest.body.data) {
    req.push(
      cfRequest.body.data,
      cfRequest.body.encoding ? "base64" : undefined
    );
  }

  req.push(null);

  const res = new Stream__default["default"]();
  res.finished = false;

  Object.defineProperty(res, "statusCode", {
    get() {
      return response.status;
    },
    set(statusCode) {
      response.status = statusCode.toString();
      response.statusDescription = HttpStatusCodes[statusCode];
    }
  });

  res.headers = {};
  const headerNames = {};
  res.writeHead = (status, headers) => {
    response.status = status.toString();
    response.statusDescription = HttpStatusCodes[status];

    if (headers) {
      res.headers = Object.assign(res.headers, headers);
    }
    return res;
  };
  res.write = (chunk) => {
    if (!response.body) {
      response.body = Buffer.from("");
    }

    response.body = Buffer.concat([
      response.body,
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    ]);
  };

  let shouldGzip = enableHTTPCompression && isGzipSupported(headers);

  const responsePromise = new Promise((resolve) => {
    res.end = (text) => {
      if (res.finished === true) {
        return;
      }

      res.finished = true;

      if (text) res.write(text);

      if (!res.statusCode) {
        res.statusCode = 200;
      }

      if (response.body) {
        response.bodyEncoding = "base64";
        response.body = shouldGzip
          ? zlib__default["default"].gzipSync(response.body).toString("base64")
          : Buffer.from(response.body).toString("base64");
      }

      response.headers = toCloudFrontHeaders(
        res.headers,
        headerNames,
        cfResponse.headers
      );

      if (shouldGzip) {
        response.headers["content-encoding"] = [
          { key: "Content-Encoding", value: "gzip" }
        ];
      }
      resolve(response);
    };
  });

  res.setHeader = (name, value) => {
    res.headers[name.toLowerCase()] = value;
    headerNames[name.toLowerCase()] = name;
  };
  res.removeHeader = (name) => {
    delete res.headers[name.toLowerCase()];
  };
  res.getHeader = (name) => {
    return res.headers[name.toLowerCase()];
  };
  res.getHeaders = () => {
    return res.headers;
  };
  res.hasHeader = (name) => {
    return !!res.getHeader(name);
  };

  return {
    req,
    res,
    responsePromise
  };
};

handler$1.SPECIAL_NODE_HEADERS = specialNodeHeaders;

var nextAwsCloudfront = handler$1;

// Blacklisted or read-only headers in CloudFront
const ignoredHeaders = [
    "connection",
    "expect",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "proxy-connection",
    "trailer",
    "upgrade",
    "x-accel-buffering",
    "x-accel-charset",
    "x-accel-limit-rate",
    "x-accel-redirect",
    "x-cache",
    "x-forwarded-proto",
    "x-real-ip",
    "content-length",
    "host",
    "transfer-encoding",
    "via"
];
const ignoredHeaderPrefixes = ["x-amz-cf-", "x-amzn-", "x-edge-"];
function isIgnoredHeader(name) {
    const lowerCaseName = name.toLowerCase();
    for (const prefix of ignoredHeaderPrefixes) {
        if (lowerCaseName.startsWith(prefix)) {
            return true;
        }
    }
    return ignoredHeaders.includes(lowerCaseName);
}
async function createExternalRewriteResponse(customRewrite, req, res, body) {
    const { default: fetch } = await Promise.resolve().then(function () { return require('./index-686a9242.js'); });
    // Set request headers
    const reqHeaders = {};
    Object.assign(reqHeaders, req.headers);
    // Delete host header otherwise request may fail due to host mismatch
    if (reqHeaders.hasOwnProperty("host")) {
        delete reqHeaders.host;
    }
    let fetchResponse;
    if (body) {
        const decodedBody = Buffer.from(body, "base64").toString("utf8");
        fetchResponse = await fetch(customRewrite, {
            headers: reqHeaders,
            method: req.method,
            body: decodedBody,
            redirect: "manual"
        });
    }
    else {
        fetchResponse = await fetch(customRewrite, {
            headers: reqHeaders,
            method: req.method,
            compress: false,
            redirect: "manual"
        });
    }
    for (const [name, val] of fetchResponse.headers.entries()) {
        if (!isIgnoredHeader(name)) {
            res.setHeader(name, val);
        }
    }
    res.statusCode = fetchResponse.status;
    res.end(await fetchResponse.buffer());
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
        keys.push({
            // Use parenthesized substring match if available, index otherwise
            name: execResult[1] || index++,
            prefix: "",
            suffix: "",
            modifier: "",
            pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}

/**
 Provides matching capabilities to support custom redirects, rewrites, and headers.
 */
/**
 * Match the given path against a source path.
 * @param path
 * @param source
 */
function matchPath(path, source) {
    const matcher = match(source, { decode: decodeURIComponent });
    return matcher(path);
}
/**
 * Compile a destination for redirects or rewrites.
 * @param destination
 * @param params
 */
function compileDestination(destination, params) {
    try {
        const destinationLowerCase = destination.toLowerCase();
        if (destinationLowerCase.startsWith("https://") ||
            destinationLowerCase.startsWith("http://")) {
            // Handle external URL redirects
            const { origin, pathname, search } = new URL(destination);
            const toPath = compile(pathname, { encode: encodeURIComponent });
            const compiledDestination = `${origin}${toPath(params)}${search}`;
            // Remove trailing slash if original destination didn't have it
            if (!destination.endsWith("/") && compiledDestination.endsWith("/")) {
                return compiledDestination.slice(0, -1);
            }
            else {
                return compiledDestination;
            }
        }
        else {
            // Handle all other paths. Escape all ? in case of query parameters
            const escapedDestination = destination.replace(/\?/g, "\\?");
            const toPath = compile(escapedDestination, {
                encode: encodeURIComponent
            });
            return toPath(params);
        }
    }
    catch (error) {
        console.error(`Could not compile destination ${destination}, returning null instead. Error: ${error}`);
        return null;
    }
}
const matchDynamic = (uri, routes) => {
    for (const { file, regex } of routes) {
        const re = new RegExp(regex, "i");
        if (re.test(uri)) {
            return file;
        }
    }
};
const matchDynamicRoute = (uri, routes) => {
    for (const { route, regex } of routes) {
        const re = new RegExp(regex, "i");
        if (re.test(uri)) {
            return route;
        }
    }
};

const resolveHostForHeader = (req, headerName) => {
    const hostHeaders = req.headers[headerName];
    /**
     * if hostHeaders is a string means it is resolved as "x-forwarded-host"
     *  "x-forwarded-host": "next-serverless.com"
     *
     * else it is resolved as host
     * [ { key: 'Host', value: 'next-serverless.com' } ]
     **/
    if (typeof hostHeaders === "string" || hostHeaders instanceof String) {
        return hostHeaders;
    }
    if (hostHeaders && hostHeaders.length > 0) {
        return hostHeaders[0].value.split(":")[0];
    }
    return undefined;
};
function resolveHost(req) {
    // When running behind a reverse-proxy the x-forwarded-host is added
    const xForwardedHost = resolveHostForHeader(req, "x-forwarded-host");
    if (xForwardedHost) {
        return xForwardedHost;
    }
    return resolveHostForHeader(req, "host");
}
const findDomainLocale = (req, manifest) => {
    var _a;
    const domains = (_a = manifest.i18n) === null || _a === void 0 ? void 0 : _a.domains;
    if (domains) {
        const host = resolveHost(req);
        if (host) {
            const matchedDomain = domains.find((d) => d.domain === host);
            if (matchedDomain) {
                return matchedDomain.defaultLocale;
            }
        }
    }
    return null;
};
function addDefaultLocaleToPath(path, routesManifest, forceLocale = null) {
    if (routesManifest.i18n) {
        const defaultLocale = forceLocale !== null && forceLocale !== void 0 ? forceLocale : routesManifest.i18n.defaultLocale;
        const locales = routesManifest.i18n.locales;
        const basePath = path.startsWith(routesManifest.basePath)
            ? routesManifest.basePath
            : "";
        // If prefixed with a locale, return that path with normalized locale
        const pathLowerCase = path.toLowerCase();
        for (const locale of locales) {
            if (pathLowerCase === `${basePath}/${locale}`.toLowerCase() ||
                pathLowerCase.startsWith(`${basePath}/${locale}/`.toLowerCase())) {
                return path.replace(new RegExp(`${basePath}/${locale}`, "i"), `${basePath}/${forceLocale !== null && forceLocale !== void 0 ? forceLocale : locale}`);
            }
        }
        // Otherwise, prefix with default locale
        if (path === "/" || path === `${basePath}`) {
            return `${basePath}/${defaultLocale}`;
        }
        else {
            return path.replace(`${basePath}/`, `${basePath}/${defaultLocale}/`);
        }
    }
    return path;
}
function dropLocaleFromPath(path, routesManifest) {
    if (routesManifest.i18n) {
        const pathLowerCase = path.toLowerCase();
        const locales = routesManifest.i18n.locales;
        // If prefixed with a locale, return path without
        for (const locale of locales) {
            const prefixLowerCase = `/${locale.toLowerCase()}`;
            if (pathLowerCase === prefixLowerCase) {
                return "/";
            }
            if (pathLowerCase.startsWith(`${prefixLowerCase}/`)) {
                return `${pathLowerCase.slice(prefixLowerCase.length)}`;
            }
        }
    }
    return path;
}
function getLocalePrefixFromUri(uri, routesManifest) {
    if (routesManifest.basePath && uri.startsWith(routesManifest.basePath)) {
        uri = uri.slice(routesManifest.basePath.length);
    }
    if (routesManifest.i18n) {
        const uriLowerCase = uri.toLowerCase();
        for (const locale of routesManifest.i18n.locales) {
            const localeLowerCase = locale.toLowerCase();
            if (uriLowerCase === `/${localeLowerCase}` ||
                uriLowerCase.startsWith(`/${localeLowerCase}/`)) {
                return `/${locale}`;
            }
        }
        return `/${routesManifest.i18n.defaultLocale}`;
    }
    return "";
}

const getCustomHeaders = (uri, routesManifest) => {
    const localized = addDefaultLocaleToPath(uri, routesManifest);
    const headers = {};
    for (const headerData of routesManifest.headers) {
        if (!matchPath(localized, headerData.source)) {
            continue;
        }
        for (const { key, value } of headerData.headers) {
            if (key) {
                // Header overriding behavior as per:
                // https://nextjs.org/docs/api-reference/next.config.js/headers
                headers[key.toLowerCase()] = [{ key, value }];
            }
        }
    }
    return headers;
};
const setCustomHeaders = (event, routesManifest) => {
    var _a;
    const [uri] = ((_a = event.req.url) !== null && _a !== void 0 ? _a : "").split("?");
    const headers = getCustomHeaders(uri, routesManifest);
    for (const [{ key, value }] of Object.values(headers)) {
        if (key) {
            event.res.setHeader(key, value);
        }
    }
};
const setHeadersFromRoute = (event, route) => {
    var _a;
    for (const [key, headers] of Object.entries(route.headers || [])) {
        const keys = headers.map(({ key }) => key);
        const values = headers.map(({ value }) => value).join(";");
        if (values) {
            event.res.setHeader((_a = keys[0]) !== null && _a !== void 0 ? _a : key, values);
        }
    }
};

const notFound = (event) => {
    event.res.statusCode = 404;
    event.res.statusMessage = "Not Found";
    event.res.end("Not Found");
};

const redirect = (event, route) => {
    setHeadersFromRoute(event, route);
    event.res.statusCode = route.status;
    event.res.statusMessage = route.statusDescription;
    event.res.end();
};

const toRequest = (event) => {
    var _a;
    const [uri, querystring] = ((_a = event.req.url) !== null && _a !== void 0 ? _a : "").split("?");
    const headers = {};
    for (const [key, value] of Object.entries(event.req.headers)) {
        if (value && Array.isArray(value)) {
            headers[key.toLowerCase()] = value.map((value) => ({ key, value }));
        }
        else if (value) {
            headers[key.toLowerCase()] = [{ key, value }];
        }
    }
    return {
        headers,
        querystring,
        uri
    };
};

const normalise = (uri, routesManifest) => {
    const { basePath } = routesManifest;
    if (basePath) {
        if (uri.startsWith(basePath)) {
            uri = uri.slice(basePath.length);
        }
        else {
            // basePath set but URI does not start with basePath, return original path with special flag indicating missing expected base path
            // but basePath is expected
            return { normalisedUri: uri, missingExpectedBasePath: true };
        }
    }
    // Remove trailing slash for all paths
    if (uri.endsWith("/")) {
        uri = uri.slice(0, -1);
    }
    // Empty path should be normalised to "/" as there is no Next.js route for ""
    return {
        normalisedUri: uri === "" ? "/" : uri,
        missingExpectedBasePath: false
    };
};

const staticNotFound = (uri, manifest, routesManifest) => {
    const localePrefix = getLocalePrefixFromUri(uri, routesManifest);
    const notFoundUri = `${localePrefix}/404`;
    const static404 = manifest.pages.html.nonDynamic[notFoundUri] ||
        manifest.pages.ssg.nonDynamic[notFoundUri];
    if (static404) {
        return {
            isData: false,
            isStatic: true,
            file: `pages${notFoundUri}.html`,
            statusCode: 404
        };
    }
};
const notFoundPage = (uri, manifest, routesManifest) => {
    return (staticNotFound(uri, manifest, routesManifest) || {
        isData: false,
        isRender: true,
        page: "pages/_error.js",
        statusCode: 404
    });
};

const pageHtml = (localeUri) => {
    if (localeUri == "/") {
        return "pages/index.html";
    }
    return `pages${localeUri}.html`;
};
const handlePageReq = (req, uri, manifest, routesManifest, isPreview, isRewrite) => {
    var _a, _b, _c;
    const { pages } = manifest;
    const { normalisedUri: localeUri, missingExpectedBasePath } = normalise(addDefaultLocaleToPath(uri, routesManifest, findDomainLocale(req, routesManifest)), routesManifest);
    // This allows matching against rewrites even without basepath
    if (!missingExpectedBasePath) {
        if (pages.html.nonDynamic[localeUri]) {
            const nonLocaleUri = dropLocaleFromPath(localeUri, routesManifest);
            const statusCode = nonLocaleUri === "/404"
                ? 404
                : nonLocaleUri === "/500"
                    ? 500
                    : undefined;
            return {
                isData: false,
                isStatic: true,
                file: pages.html.nonDynamic[localeUri],
                statusCode
            };
        }
        if (pages.ssg.nonDynamic[localeUri] && !isPreview) {
            const ssg = pages.ssg.nonDynamic[localeUri];
            const route = (_a = ssg.srcRoute) !== null && _a !== void 0 ? _a : localeUri;
            const nonLocaleUri = dropLocaleFromPath(localeUri, routesManifest);
            const statusCode = nonLocaleUri === "/404"
                ? 404
                : nonLocaleUri === "/500"
                    ? 500
                    : undefined;
            return {
                isData: false,
                isStatic: true,
                file: pageHtml(localeUri),
                // page JS path is from SSR entries in manifest
                page: pages.ssr.nonDynamic[route] || pages.ssr.dynamic[route],
                revalidate: ssg.initialRevalidateSeconds,
                statusCode
            };
        }
        // Handle ISR pages with encoded URL
        // This only applies to ISR, other pages should not be resolved if sent with encoded characters (same as local Next.js server behavior)
        const decodedLocaleUri = decodeURI(localeUri);
        if (pages.ssg.nonDynamic[decodedLocaleUri] && !isPreview) {
            const ssg = pages.ssg.nonDynamic[decodedLocaleUri];
            if (ssg.initialRevalidateSeconds) {
                const route = (_b = ssg.srcRoute) !== null && _b !== void 0 ? _b : decodedLocaleUri;
                const nonLocaleUri = dropLocaleFromPath(decodedLocaleUri, routesManifest);
                const statusCode = nonLocaleUri === "/404"
                    ? 404
                    : nonLocaleUri === "/500"
                        ? 500
                        : undefined;
                return {
                    isData: false,
                    isStatic: true,
                    file: pageHtml(localeUri),
                    // page JS path is from SSR entries in manifest
                    page: pages.ssr.nonDynamic[route] || pages.ssr.dynamic[route],
                    revalidate: ssg.initialRevalidateSeconds,
                    statusCode
                };
            }
        }
        if (((_c = pages.ssg.notFound) !== null && _c !== void 0 ? _c : {})[localeUri] && !isPreview) {
            return notFoundPage(uri, manifest, routesManifest);
        }
        if (pages.ssr.nonDynamic[localeUri]) {
            if (localeUri.startsWith("/api/")) {
                return {
                    isApi: true,
                    page: pages.ssr.nonDynamic[localeUri]
                };
            }
            else {
                return {
                    isData: false,
                    isRender: true,
                    page: pages.ssr.nonDynamic[localeUri]
                };
            }
        }
    }
    const rewrite = !isRewrite && getRewritePath(req, uri, routesManifest, manifest);
    if (rewrite) {
        const [path, querystring] = rewrite.split("?");
        if (isExternalRewrite(path)) {
            return {
                isExternal: true,
                path,
                querystring
            };
        }
        const route = handlePageReq(req, path, manifest, routesManifest, isPreview, true);
        return {
            ...route,
            querystring
        };
    }
    // We don't want to match URIs with missing basepath against dynamic routes if it wasn't already covered by rewrite.
    if (!missingExpectedBasePath) {
        const dynamic = matchDynamicRoute(localeUri, pages.dynamic);
        const dynamicSSG = dynamic && pages.ssg.dynamic[dynamic];
        if (dynamicSSG && !isPreview) {
            return {
                isData: false,
                isStatic: true,
                file: pageHtml(localeUri),
                page: dynamic ? pages.ssr.dynamic[dynamic] : undefined,
                fallback: dynamicSSG.fallback
            };
        }
        const dynamicSSR = dynamic && pages.ssr.dynamic[dynamic];
        if (dynamicSSR) {
            if (dynamic.startsWith("/api/")) {
                return {
                    isApi: true,
                    page: dynamicSSR
                };
            }
            else {
                return {
                    isData: false,
                    isRender: true,
                    page: dynamicSSR
                };
            }
        }
        const dynamicHTML = dynamic && pages.html.dynamic[dynamic];
        if (dynamicHTML) {
            return {
                isData: false,
                isStatic: true,
                file: dynamicHTML
            };
        }
    }
    return notFoundPage(uri, manifest, routesManifest);
};

/**
 * Get the rewrite of the given path, if it exists.
 * @param uri
 * @param pageManifest
 * @param routesManifest
 */
function getRewritePath(req, uri, routesManifest, pageManifest) {
    const path = addDefaultLocaleToPath(uri, routesManifest, findDomainLocale(req, routesManifest));
    const rewrites = routesManifest.rewrites;
    for (const rewrite of rewrites) {
        const match = matchPath(path, rewrite.source);
        if (!match) {
            continue;
        }
        const params = match.params;
        const destination = compileDestination(rewrite.destination, params);
        if (!destination) {
            return;
        }
        // No-op rewrite support for pages: skip to next rewrite if path does not map to existing non-dynamic and dynamic routes
        if (pageManifest && path === destination) {
            const url = handlePageReq(req, destination, pageManifest, routesManifest, false, true);
            if (url.statusCode === 404) {
                continue;
            }
        }
        // Pass unused params to destination
        // except nextInternalLocale param since it's already in path prefix
        const querystring = Object.keys(params)
            .filter((key) => key !== "nextInternalLocale")
            .filter((key) => !rewrite.destination.endsWith(`:${key}`) &&
            !rewrite.destination.includes(`:${key}/`))
            .map((key) => {
            const param = params[key];
            if (typeof param === "string") {
                return `${key}=${param}`;
            }
            else {
                return param.map((val) => `${key}=${val}`).join("&");
            }
        })
            .filter((key) => key)
            .join("&");
        if (querystring) {
            const separator = destination.includes("?") ? "&" : "?";
            return `${destination}${separator}${querystring}`;
        }
        return destination;
    }
}
function isExternalRewrite(customRewrite) {
    return (customRewrite.startsWith("http://") || customRewrite.startsWith("https://"));
}

const handleApiReq = (req, uri, manifest, routesManifest, isRewrite) => {
    const { apis } = manifest;
    const { normalisedUri, missingExpectedBasePath } = normalise(uri, routesManifest);
    if (!missingExpectedBasePath) {
        const nonDynamic = apis.nonDynamic[normalisedUri];
        if (nonDynamic) {
            return {
                isApi: true,
                page: nonDynamic
            };
        }
    }
    const rewrite = !isRewrite && getRewritePath(req, uri, routesManifest);
    if (rewrite) {
        // Rewrites include locales even for api routes
        const apiRewrite = dropLocaleFromPath(rewrite, routesManifest);
        const [path, querystring] = apiRewrite.split("?");
        if (isExternalRewrite(path)) {
            return {
                isExternal: true,
                path,
                querystring
            };
        }
        const route = handleApiReq(req, path, manifest, routesManifest, true);
        if (route) {
            return {
                ...route,
                querystring
            };
        }
        return route;
    }
    if (!missingExpectedBasePath) {
        const dynamic = matchDynamic(normalisedUri, apis.dynamic);
        if (dynamic) {
            return {
                isApi: true,
                page: dynamic
            };
        }
    }
};

function getUnauthenticatedResponse(authorizationHeaders, authentication) {
    var _a;
    if (authentication && authentication.username && authentication.password) {
        const validAuth = "Basic " +
            Buffer.from(authentication.username + ":" + authentication.password).toString("base64");
        if (!authorizationHeaders || ((_a = authorizationHeaders[0]) === null || _a === void 0 ? void 0 : _a.value) !== validAuth) {
            return {
                isUnauthorized: true,
                status: 401,
                statusDescription: "Unauthorized",
                body: "Unauthorized",
                headers: {
                    "www-authenticate": [{ key: "WWW-Authenticate", value: "Basic" }]
                }
            };
        }
    }
}

/**
 * Create a redirect response with the given status code
 * @param uri
 * @param querystring
 * @param statusCode
 */
function createRedirectResponse(uri, querystring, statusCode) {
    let location;
    // Properly join query strings
    if (querystring) {
        const [uriPath, uriQuery] = uri.split("?");
        location = `${uriPath}?${querystring}${uriQuery ? `&${uriQuery}` : ""}`;
    }
    else {
        location = uri;
    }
    const status = statusCode;
    const statusDescription = http.STATUS_CODES[status];
    const refresh = statusCode === 308
        ? [
            // Required for IE11 compatibility
            {
                key: "Refresh",
                value: `0;url=${location}`
            }
        ]
        : [];
    const cacheControl = [
        {
            key: "Cache-Control",
            value: "s-maxage=0"
        }
    ];
    return {
        isRedirect: true,
        status: status,
        statusDescription: statusDescription || "",
        headers: {
            location: [
                {
                    key: "Location",
                    value: location
                }
            ],
            refresh: refresh,
            "cache-control": cacheControl
        }
    };
}
/**
 * Get a domain redirect such as redirecting www to non-www domain.
 * @param request
 * @param manifest
 */
function getDomainRedirectPath(request, manifest) {
    const hostHeaders = request.headers["host"];
    if (hostHeaders && hostHeaders.length > 0) {
        const host = hostHeaders[0].value;
        const domainRedirects = manifest.domainRedirects;
        if (domainRedirects && domainRedirects[host]) {
            return `${domainRedirects[host]}${request.uri}`;
        }
    }
}
/**
 * Get the redirect of the given path, if it exists.
 * @param request
 * @param routesManifest
 */
function getRedirectPath(request, routesManifest) {
    var _a;
    const path = addDefaultLocaleToPath(request.uri, routesManifest);
    const redirects = (_a = routesManifest.redirects) !== null && _a !== void 0 ? _a : [];
    for (const redirect of redirects) {
        const match = matchPath(path, redirect.source);
        if (match) {
            const compiledDestination = compileDestination(redirect.destination, match.params);
            if (!compiledDestination) {
                return null;
            }
            return {
                path: compiledDestination,
                statusCode: redirect.statusCode
            };
        }
    }
    return null;
}

const handleAuth = (req, manifest) => {
    const { headers } = req;
    return getUnauthenticatedResponse(headers.authorization, manifest.authentication);
};
const handleCustomRedirects = (req, routesManifest) => {
    const redirect = getRedirectPath(req, routesManifest);
    if (redirect) {
        const { path, statusCode } = redirect;
        return createRedirectResponse(path, req.querystring, statusCode);
    }
};
const handleDomainRedirects = (req, manifest) => {
    const path = getDomainRedirectPath(req, manifest);
    if (path) {
        return createRedirectResponse(path, req.querystring, 308);
    }
};
/*
 * Routes:
 * - auth
 * - redirects
 * - api routes
 * - rewrites (external and api)
 */
const routeApi = (req, manifest, routesManifest) => {
    const auth = handleAuth(req, manifest);
    if (auth) {
        return auth;
    }
    const redirect = handleDomainRedirects(req, manifest) ||
        handleCustomRedirects(req, routesManifest);
    if (redirect) {
        return redirect;
    }
    return handleApiReq(req, req.uri, manifest, routesManifest);
};

const unauthorized = (event, route) => {
    setHeadersFromRoute(event, route);
    event.res.statusCode = route.status;
    event.res.statusMessage = route.statusDescription;
    event.res.end();
};

/*
 * Handles api routes.
 *
 * Returns ExternalRoute for handling in the caller.
 *
 * If return is void, the response has already been generated in
 * event.res/event.responsePromise which the caller should wait on.
 */
const handleApi = async (event, manifest, routesManifest, getPage) => {
    const request = toRequest(event);
    const route = routeApi(request, manifest, routesManifest);
    if (!route) {
        return notFound(event);
    }
    if (route.querystring) {
        event.req.url = `${event.req.url}${request.querystring ? "&" : "?"}${route.querystring}`;
    }
    if (route.isApi) {
        const { page } = route;
        setCustomHeaders(event, routesManifest);
        if (!event.req.hasOwnProperty("originalRequest")) {
            Object.defineProperty(event.req, "originalRequest", {
                get: () => event.req
            });
        }
        if (!event.res.hasOwnProperty("originalResponse")) {
            Object.defineProperty(event.res, "originalResponse", {
                get: () => event.res
            });
        }
        getPage(page).default(event.req, event.res);
        return;
    }
    if (route.isRedirect) {
        return redirect(event, route);
    }
    if (route.isUnauthorized) {
        return unauthorized(event, route);
    }
    // No if lets typescript check this is ExternalRoute
    return route;
};

const blacklistedHeaders = [
    "connection",
    "expect",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "proxy-connection",
    "trailer",
    "upgrade",
    "x-accel-buffering",
    "x-accel-charset",
    "x-accel-limit-rate",
    "x-accel-redirect",
    "x-cache",
    "x-forwarded-proto",
    "x-real-ip"
];
const blacklistedHeaderPrefixes = ["x-amz-cf-", "x-amzn-", "x-edge-"];
function isBlacklistedHeader(name) {
    const lowerCaseName = name.toLowerCase();
    for (const prefix of blacklistedHeaderPrefixes) {
        if (lowerCaseName.startsWith(prefix)) {
            return true;
        }
    }
    return blacklistedHeaders.includes(lowerCaseName);
}
function removeBlacklistedHeaders(headers) {
    for (const header in headers) {
        if (isBlacklistedHeader(header)) {
            delete headers[header];
        }
    }
}

// @ts-ignore
const handler = async (event) => {
    var _a;
    const request = event.Records[0].cf.request;
    const routesManifest = RoutesManifestJson__default["default"];
    const buildManifest = manifest__default["default"];
    const { req, res, responsePromise } = nextAwsCloudfront(event.Records[0].cf, {
        enableHTTPCompression: buildManifest.enableHTTPCompression
    });
    const external = await handleApi({ req, res, responsePromise }, buildManifest, routesManifest, (pagePath) => require(`./${pagePath}`));
    if (external) {
        const { path } = external;
        await createExternalRewriteResponse(path, req, res, (_a = request.body) === null || _a === void 0 ? void 0 : _a.data);
    }
    const response = await responsePromise;
    if (response.headers) {
        removeBlacklistedHeaders(response.headers);
    }
    return response;
};

exports.handler = handler;
