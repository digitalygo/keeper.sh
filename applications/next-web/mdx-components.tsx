import type { MDXComponents } from "mdx/types";
import { Copy } from "@/components/copy";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props}>
        <Copy className="inline">{children}</Copy>
      </li>
    ),
    p: ({ children, ...props }) => (
      <Copy {...props}>{children}</Copy>
    ),
    a: ({ children, ...props }) => (
      <a className="text-foreground underline hover:text-foreground-muted" target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
    ...components,
  };
}
