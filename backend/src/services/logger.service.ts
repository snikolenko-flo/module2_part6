import {mkdir, writeFile} from 'node:fs/promises';
import * as fs from 'fs';
import * as os from 'node:os';

export class LoggerService {
  fileCreated: Date;
  fileName: string;
  filePath: string;
  directory: string;
  logInterval: number;
  minutes: number;
  oneMinuteInMs: number;
  openToAppend: object;

  constructor() {
    this.fileCreated = new Date();
    this.directory = 'logs';
    this.fileName = `logs_${this.fileCreated}.txt`;
    this.filePath = `./${this.directory}/${this.fileName}`;
    this.minutes = 1;
    this.oneMinuteInMs = 60000;
    this.logInterval = this.oneMinuteInMs * this.minutes;
    this.openToAppend = {flag: 'a+'};
  }

  async writeLog(level, message) {
    const content = this.formatLogContent(level, message);

    if (!this.directoryExists(this.directory)) {
      await this.createDirectory('logs');
      return;
    }

    if (!this.fileExists(this.filePath)) {
      await this.createLogFile(this.filePath, content);
    }

    if (this.logTimeExpired()) {
      const date = new Date();
      const filePath = `./${this.directory}/logs_${date}.txt`;
      await this.createLogFile(filePath, content);

      this.fileCreated = date;
      this.fileName = `logs_${date}.txt`;
      this.filePath = filePath;
    } else {
      await writeFile(this.filePath, content, this.openToAppend);
    }
  }

  logTimeExpired(): boolean {
    const date = new Date();
    const dif = date.getTime() - this.fileCreated.getTime();
    return dif > this.logInterval;
  }

  async createLogFile(file, content) {
    await writeFile(file, content, this.openToAppend);
  }

  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  directoryExists(directory) {
    return fs.existsSync(directory);
  }

  async createDirectory(dirName) {
    this.directory = await mkdir(dirName, {recursive: true});
  }

  formatLogContent(level, message) {
    return level + ': ' + message + os.EOL;
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

export const log = new LoggerService();