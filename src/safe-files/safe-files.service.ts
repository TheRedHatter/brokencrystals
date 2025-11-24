import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

const ALLOWED_HOSTS = new Set(['filedealer.nexploit.app']);

export interface SafeFileResponse {
  name: string;
  url: string;
  content: string;
}

@Injectable()
export class SafeFilesService {
  async add(name: string, url: string): Promise<SafeFileResponse> {
    const host = new URL(url).host;
    if (!ALLOWED_HOSTS.has(host)) {
      throw new BadRequestException('Untrusted host');
    }
    const content = await this.fetchContent(url);
    return { name, url, content };
  }

  private async fetchContent(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'text' });
    return typeof response.data === 'string'
      ? response.data
      : JSON.stringify(response.data);
  }
}
