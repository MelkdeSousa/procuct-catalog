export const topics = [
  "catalog-emit",
  // 'product.created',
  //  'product.updated',
  //   'product.deleted'
] as const;

export type Topics = (typeof topics)[number];
