const { TableClient } = require('@azure/data-tables');

const serviceClient = TableClient.fromConnectionString(
  process.env.CON_STRING,
  process.env.TABLE_NAME
);

module.exports = serviceClient;
