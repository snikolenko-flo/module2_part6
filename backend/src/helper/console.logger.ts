import os from 'node:os';
import { Logger } from './abstract.logger.js';

export class ConsoleLogger extends Logger {
  async writeLog(level: string, message: string) {
    const content = this.formatLogContent(level, message);
    console.log(content);
  }
  formatLogContent(level: string, message: string) {
    return level + ': ' + message + os.EOL;
  }

  fatal(message: string) {
    this.writeLog('fatal', message);
  }

  error(message: string) {
    this.writeLog('error', message);
  }

  warn(message: string) {
    this.writeLog('warn', message);
  }

  info(message: string) {
    this.writeLog('info', message);
  }

  debug(message) {
    this.writeLog('debug', message);
  }

  trace(message) {
    this.writeLog('trace', message);
  }
}