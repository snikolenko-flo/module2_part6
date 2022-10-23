import fs from 'fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';

export class FileSystemService {
  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  directoryExists(directory: string) {
    return fs.existsSync(directory);
  }

  async createFile(file: string, content: string) {
    await writeFile(file, content, {flag: 'a+'});
  }

  async createDirectory(dirName: string) {
    await mkdir(dirName, {recursive: true});
  }

  removeFirstDirFromPath(filePath) {
    return filePath.split('/').slice(1).join('/');
  }

  async getFileMetadata(filePath) {
    const fileStat = await stat(filePath);
    return fileStat;
  }
}
