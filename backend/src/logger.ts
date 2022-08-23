import { writeFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import * as fs from 'fs';
import * as os from 'node:os';

export class Logger {
  fileCreated: Date;
  fileName: string;
  directory: string;
  createLogInterval: number;
  minutes: number;
  oneMinuteInMs: number;

  constructor() {
    this.fileCreated = new Date();
    this.directory = 'logs';
    this.fileName = `logs_${this.fileCreated}.txt`;
    this.minutes = 60;
    this.oneMinuteInMs = 60000;
    this.createLogInterval = this.oneMinuteInMs * this.minutes;
  }

  async writeLog(level, message) {

    if (!fs.existsSync(this.directory)) {
      this.directory = await mkdir('logs', {recursive: true});
    }

    if (!fs.existsSync(`./${this.directory}/${this.fileName}`)) {
      await writeFile(`./${this.directory}/${this.fileName}`, level + ': ' + message + os.EOL, {flag: 'a+'});
      this.fileCreated = new Date();
    } else {
      const date = new Date();
      const dif = date.getTime() - this.fileCreated.getTime();

      if (dif > this.createLogInterval) {
        this.fileName = `logs_${date}.txt`;
        await writeFile(`./${this.directory}/${this.fileName}`, level + ': ' + message + os.EOL, {flag: 'a+'});
        this.fileCreated = date;
      } else {
        await writeFile(`./${this.directory}/${this.fileName}`, level + ': ' + message + os.EOL, {flag: 'a+'});
      }
    }
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