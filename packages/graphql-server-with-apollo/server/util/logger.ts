import * as winston from 'winston'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
// If we're not in production we'll also print to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      colorize: true,
      level: 'debug',
      timestamp: true,
      prettyPrint: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss', // Optional for choosing your own timestamp format.
        }),
        winston.format.align(),
        winston.format.splat(),
        winston.format.printf(info => {
          const { timestamp, level, message } = info
          return `${timestamp} [${level}]: ${message}`
        })
      ),
    })
  )
}

export default logger
