import fs from 'fs';
import { log } from '../helper/logger.js';
import { Request, Response } from 'express';
import { mkdir, writeFile } from 'node:fs/promises';

export class FileService {
  async sendFile(req: Request, res: Response, path: string, contentType: string): Promise<void> {
    fs.readFile(path, function (err, data) {
      if (err) {
        log.error('Requested file was not found.');
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      log.info(`The file "${path}" was sent to the frontend.`);
      res.setHeader('Content-Type', contentType);
      res.writeHead(200);
      res.end(data);
    });
  }

  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  directoryExists(directory: string) {
    return fs.existsSync(directory);
  }

  async createLogFile(file: string, content: string) {
    await writeFile(file, content, {flag: 'a+'});
  }

  async createDirectory(dirName: string) {
    await mkdir(dirName, {recursive: true});
  }
}
