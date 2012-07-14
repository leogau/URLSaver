var pg = require('pg'),
    connectionString = process.env.DATABASE_URL || 'postgres://leo:qcskZa6QGs@localhost:5432/urls',
    client,
    query;

var psql = 'CREATE TABLE urls (  urls_id serial NOT NULL,  time_created timestamp with time zone NOT NULL,  url text NOT NULL,  CONSTRAINT "Primary Key" PRIMARY KEY (urls_id))';

client = new pg.Client(connectionString);
client.connect();
query = client.query(psql);
query.on('end', function() { client.end(); });