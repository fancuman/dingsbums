const app = require("./app")
const http = require("http");
const yaml = require('js-yaml');
const fs = require('fs');

// Load server configuration
const config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
const host = config.http_server.host
const port = config.http_server.port;

const server = http.createServer(app);
server.listen(port, host, () => {
    console.log(`Listening on port ${port} at ${host}.`)
});
