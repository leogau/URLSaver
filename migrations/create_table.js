var pg = require('pg').native,
    connectionString = 'postgres://kngmgenohqhrfp:JCd9LQ5i23CI7RyTPc99GJngWX@ec2-23-23-237-0.compute-1.amazonaws.com:5432/daaqpbj47dgjpf',
    client,
    query;

var psql = 'CREATE TABLE urls (urls_id serial NOT NULL, time_created timestamp with time zone NOT NULL, url text NOT NULL, CONSTRAINT "Primary Key" PRIMARY KEY (urls_id))';

console.log("c string: ", connectionString);
console.log("about to create client");
client = new pg.Client(connectionString);
console.log("about to connect to db");
client.connect();
console.log("client connected");
query = client.query(psql);
console.log("query executed");
query.on('end', function() { console.log("end recieved"); client.end(); });