import { writeFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import * as fs from 'fs';
import * as os from 'node:os';

export class Logger {

  async writeLog(level, message) {
    let directory = 'logs';
    if (!fs.existsSync(directory)) {
      directory = await mkdir('logs', { recursive: true });
    }
    await writeFile(`./${directory}/logs.txt`, level + ': ' + message + os.EOL, { flag: 'a+' });
  }

  fatal(message) {
    this.writeLog('fatal', message);
  }

  error(message) {
    this.writeLog('error', message);
  }

  warn(message) {
    this.writeLog('warn', message);
  }

  info(message) {
    this.writeLog('info', message);
  }

  debug(message) {
    this.writeLog('debug', message);
  }

  trace(message) {
    this.writeLog('trace', message);
  }
}

export const log = new Logger();