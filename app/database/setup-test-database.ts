import { connectToDatabase } from './database-connection';
import logger from '../lib/logger';

const setupTestDatabase = () => {
  it('', (done) => {
    connectToDatabase()
      .then(async (result) => {
        const { collections } = result.connection;
        await Promise.all(
          Object.values(collections).map(async (collection) => {
            await collection.deleteMany({});
          }),
        );
        done();
      })
      .catch((err) => {
        logger.info(err);
        done();
      });
  });

  // beforeAll('implements optimistic concurrency control', async () => {
  //     await connectToDatabase()
  //         .then(async (res) => {
  //             await res.connection.db.dropDatabase();
  //             done();
  //         })
  //         .catch((err) => {
  //             logger.info(err);
  //             done();
  //         });
  //      });
  // afterAll(async (done) => {
  //   await connectToDatabase()
  //     .then(async (res) => {
  //       await res.connection.db.dropDatabase();
  //       done();
  //     })
  //     .catch((err) => {
  //       logger.info(err);
  //       done();
  //     });
  // });
};
export default setupTestDatabase;
