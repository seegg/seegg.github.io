import * as projects from './projects.json';
import * as ramblings from './ramblings.json';
import { ReflectionsBlog, AllProjects } from '../types';

/**
 * get projects data
 * @param path GET projects
 * @returns 
 */
export const getProjects = async (path = 'https://seegg.github.io/src/data/projects.json'): Promise<AllProjects> => {
  try {
    return await fetchJSONData(path);
  } catch (err) {
    console.error('Error fetching data, using fallback project data.');
    return JSON.parse(JSON.stringify(projects));
  }
};

/**
 * get blog entries
 * @param path GET blog entries
 * @returns 
 */
export const getRamblings = async (path: string): Promise<ReflectionsBlog> => {
  try {
    return await fetchJSONData(path);
  } catch (err) {
    console.error('Error fetching data, using fallback blog data.');
    return JSON.parse(JSON.stringify(ramblings));
  }
};

/**
 * Fetch helper
 * @param path 
 * @returns Promise<T>
 */
export const fetchJSONData = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, { method: 'GET', headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error();
  return response.json();
};