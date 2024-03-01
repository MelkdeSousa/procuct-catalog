export type Topics = {
  "catalog-emit": string;
  "product.created": { ownerId: string; productId: string };
  "product.updated": { ownerId: string; productId: string };
  "product.deleted": { ownerId: string; productId: string };
};

export type Topic = keyof Topics;
export type TopicPayload<T extends keyof Topics> = Topics[T];
