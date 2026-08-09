import type { Printer } from 'prettier';
import * as markdown from 'prettier/plugins/markdown';

const basePrinter = markdown.printers.mdast;

export const printers: { mdast: Printer } = {
  mdast: {
    ...basePrinter,
    print(path, options, print) {
      const node = path.node;
      if (node.type === 'inlineMath') {
        const isDisplay =
          node.data?.hProperties?.className?.includes('math-display') ?? false;
        return [isDisplay ? '$$' : '$', node.value, isDisplay ? '$$' : '$'];
      }
      return basePrinter.print(path, options, print);
    },
  },
};
