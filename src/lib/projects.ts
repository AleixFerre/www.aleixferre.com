import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getProject(id: string): Promise<Project> {
  const project = await getEntry('projects', id);
  if (!project) throw new Error(`Project not found: ${id}`);
  return project;
}
