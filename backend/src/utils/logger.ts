import { createLogger, transports, format } from 'winston'
export const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`
        )
    ),
    transports: [new transports.Console()]
})
