import type { Parser } from 'prettier';
import * as markdown from 'prettier/plugins/markdown';
import { transform } from './transform.js';

export const parsers: { markdown: Parser } = {
  markdown: {
    ...markdown.parsers.markdown,
    async parse(text, options) {
      const ast = markdown.parsers.markdown.parse(text, options);

      await transform(ast);

      return ast;
    },
  },
};
