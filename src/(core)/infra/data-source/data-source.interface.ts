export type DataSource = {
    clearCollection: (collectionName: string) => Promise<void>;

    find: <T>(collectionName: string, { id, ...query }: {
        id?: string
        [k: string]: unknown
    }) => Promise<T[]>;

    insertOne: (collectionName: string, item: Record<string, unknown>) => Promise<{
        insertedId: string;
    }>;
    update: (collectionName: string, query: {
        id: string;
        [k: string]: unknown;
    }, updateData: Record<string, unknown>) => Promise<void>;
}
