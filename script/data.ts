import * as projects from './projects.json';
import * as ramblings from './ramblings.json';
import { Project, ReflectionsBlog } from './types';


export const getProjects = (): Project[] => {
  return JSON.parse(JSON.stringify(projects)).projects;
}

export const getTestProjects = (): Project[] => {
  return JSON.parse(JSON.stringify(projects))['test-projects'];
}

export const getRamblings = async (path: string): Promise<ReflectionsBlog> => {
  try {
    return await fetchJSONData(path);
  } catch (err) {
    console.error('Error fetching data, using fallback.');
    return JSON.parse(JSON.stringify(ramblings));
  }
}

/**
 * Fetch helper
 * @param path 
 * @returns 
 */
const fetchJSONData = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, { method: 'GET', headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error();
  return response.json();
}