const { app } = require('@azure/functions');
const client = require('./db');

app.http('getVisitorCount', {
  methods: ['GET'],
  authLevel: 'function',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    const entity = await client.getEntity('VisitorCountPartition', '1');

    return { body: JSON.stringify({ count: entity.visitorCount }) };
  },
});
