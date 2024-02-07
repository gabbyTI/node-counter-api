const { app } = require('@azure/functions');
const client = require('./db');

app.http('updateVisitorCount', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const entity = await client.getEntity('VisitorCountPartition', '1');

    const newCount = entity.visitorCount + 1;

    const tableEntity = {
      partitionKey: 'VisitorCountPartition',
      rowKey: '1',
      visitorCount: newCount,
    };

    await client.upsertEntity(tableEntity, 'Merge');

    return { body: JSON.stringify({ count: tableEntity.visitorCount }) };
  },
});
