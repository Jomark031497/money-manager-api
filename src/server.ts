import 'dotenv/config';
import logger from './utils/logger';
import prisma from './utils/prisma';
import app from './app';

const main = async () => {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    logger.info(`server started at http://localhost:${port}`);
  });
};

main()
  .catch((err) => {
    logger.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
