import {defineCollection} from 'astro:content';
import z from 'zod';
import path from 'path'

const gallerySchema = z.array(z.string());

export const portfolioSchema = z.object({
    type: z.string(),
	title: z.string(),
	year: z.string(),
	category: z.string(),
	role: z.string(),
	name: z.string(),
	description: z.string(),
	githublink: z.string().optional(),
	mockup: z.string(),
	problem: z.string(),
	solution: z.string(),
	features_scope: z.array(z.string()),
	development_process: z.string(),
	gallery: gallerySchema,
});


export const portfolioCollection = {
	schema: portfolioSchema
};

const glob = import.meta.glob('./**/*.md');

export const collectionNames = Object.keys(glob)
    .map((filepath) => path.basename(path.dirname(filepath)))
    .filter((name) => name !== '.' && name !== '..');

const schema = {
    schema: z.object({
        title: z.string()
    })
};

function assignCollection(acc: any, name: any) {
    return Object.assign(acc, { [name]: defineCollection({ ...portfolioCollection }) });
}

export const collections = collectionNames.reduce(assignCollection, {});