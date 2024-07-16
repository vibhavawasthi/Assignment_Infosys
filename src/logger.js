import log from 'loglevel';
 
const logger = log.getLogger('RewardPointsCalculator');
logger.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');
 
export default logger;