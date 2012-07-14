var pg = require('pg').native,
    connectionString = process.env.DATABASE_URL || 'postgres://leo:qcskZa6QGs@localhost:5432/urls',
    client,
    query;

var psql = 'CREATE TABLE urls (  urls_id serial NOT NULL,  time_created timestamp with time zone NOT NULL,  url text NOT NULL,  CONSTRAINT "Primary Key" PRIMARY KEY (urls_id))';

console.log("about to create client");
client = new pg.Client(connectionString);
console.log("about to connect to db");
client.connect();
console.log("client connected");
query = client.query(psql);
query.on('end', function() { client.end(); });