import { prettierPluginLatex } from '@unified-latex/unified-latex-prettier';
import * as prettier from 'prettier';

export async function formatMath(source: string, blockMode: boolean) {
  const structuredSource = blockMode
    ? `\\begin{equation}\n${source}\\end{equation}`
    : `$${source}$`;
  const formatted = await prettier.format(structuredSource, {
    plugins: [prettierPluginLatex],
    parser: 'latex-parser',
  });
  return blockMode
    ? formatted
        .split('\n')
        .slice(1, -1)
        .map((s) => s.replace(/^  /, ''))
        .join('\n')
    : formatted.replaceAll(/^\$|\$$/g, '');
}
