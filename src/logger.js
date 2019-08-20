import winston from 'winston';

const loggerDev = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

const loggerProd = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

const logger = process.env.NODE_ENV == 'prod' ? loggerProd : loggerDev;

logger.info('Log info');
logger.error('Log error');
logger.warn('Log warn');
logger.debug('Log debug');
logger.silly('Log silly');
logger.verbose('Log berbose');

export default logger;
