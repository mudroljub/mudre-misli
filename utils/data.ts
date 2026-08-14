// Backward-compatible server-side barrel. Client components should import
// from catalog directly so that they do not pull the full quotes corpus into
// their bundle.
export * from './catalog';
export * from './quotes';
