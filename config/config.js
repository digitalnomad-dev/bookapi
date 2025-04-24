require('dotenv').config();

const config = {
    server: {
        port: process.env.PORT ,
        nodeEnv: process.env.NODE_ENV ,
        apiPrefix: process.env.API_PREFIX 
    },
    database: {
        host: process.env.DB_HOST ,
        port: process.env.DB_PORT ,
        name: process.env.DB_NAME ,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD ,
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    },
    jwt: {
        secret: process.env.JWT_SECRET ,
        expiresIn: process.env.JWT_EXPIRES_IN 
    },
    pagination: {
        maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) ,
        defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) 
    },
    cors: {
        origin: process.env.CORS_ORIGIN 
    }
};

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.warn(` Warning: ${envVar} is not set in environment var`);
    }
});

module.exports = config; 