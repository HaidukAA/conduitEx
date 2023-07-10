import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    const renderer = new marked.Renderer();
    return marked(content, { renderer });
  }
}
