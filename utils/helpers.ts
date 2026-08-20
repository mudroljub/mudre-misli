/**
 * Adds basePath prefix to asset URLs for GitHub Pages deployment
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/mudre-misli' : '';
  return `${basePath}${path}`;
}
