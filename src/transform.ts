import type { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { formatMath } from './formatMath.js';

interface ASTNode extends Node {
  value: string;
  data: Node['data'] & {
    hChildren: (Node & { value: string })[];
  };
}

export async function transform(tree: ASTNode) {
  const promises: Promise<void>[] = [];
  visit(tree, ['math', 'inlineMath'], (node) => {
    promises.push(
      (async () => {
        const value = await formatMath(node.value, node.type === 'math');
        node.value = value;
      })()
    );
  });
  await Promise.all(promises);
}
