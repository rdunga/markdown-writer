import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({ headingStyle: "atx" });
turndownService.use(gfm);

export function convertHtmlToMarkdown(html: string): string {
  return turndownService.turndown(html);
}
