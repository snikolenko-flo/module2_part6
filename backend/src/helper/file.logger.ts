import { writeFile } from 'node:fs/promises';
import { Logger } from './abstract.logger.js';
import { FileService } from '../services/file.service.js';

const fileService = new FileService();

export class FileLogger extends Logger {
  async writeLog(level: string, message: string) {
    const content = this.formatLogContent(level, message);

    if (!fileService.directoryExists(this.directory)) {
      await fileService.createDirectory('logs');
      this.directory = 'logs';
      return;
    }

    if (!fileService.fileExists(this.filePath)) {
      await fileService.createLogFile(this.filePath, content);
    }

    if (this.logTimeExpired()) {
      const date = new Date();
      const filePath = `./${this.directory}/logs_${date}.txt`;
      await fileService.createLogFile(filePath, content);

      this.fileCreated = date;
      this.fileName = `logs_${date}.txt`;
      this.filePath = filePath;
    } else {
      await writeFile(this.filePath, content,{flag: 'a+'});
    }
  }

  logTimeExpired(): boolean {
    const date = new Date();
    const dif = date.getTime() - this.fileCreated.getTime();
    return dif > this.logInterval;
  }
}