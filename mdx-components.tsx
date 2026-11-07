import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-3 font-heading text-3xl leading-tight font-bold text-balance text-ink first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-7 mb-2 font-heading text-xl leading-snug font-semibold text-ink">{children}</h3>
  ),
  p: ({ children }) => <p className="my-3 max-w-[65ch] text-lg leading-relaxed">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-3 max-w-[65ch] list-disc space-y-1.5 pl-6 text-lg leading-relaxed marker:text-ink">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 max-w-[65ch] list-decimal space-y-1.5 pl-6 text-lg leading-relaxed marker:font-bold marker:text-ink">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-extrabold text-ink">{children}</strong>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
