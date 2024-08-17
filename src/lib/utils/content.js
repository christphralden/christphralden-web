import { getCollection } from 'astro:content';
import { collectionNames } from '@content/config';

export async function getAllCollections() {
    const collections = await Promise.all(
        collectionNames.map(async (name) => {
            try {
                const entries = await getCollection(name);
                return entries.map(entry => ({ ...entry, collection: name }));
            } catch (error) {
                console.warn(`Collection "${name}" does not exist or could not be retrieved. Skipping.`);
                return [];
            }
        })
    );
    return collections.flat();
}