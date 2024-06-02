import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServe } from './server.js';

const bootstrap = async () => {
    await initMongoConnection();
    setupServe();
};

bootstrap();
