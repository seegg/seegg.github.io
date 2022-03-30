import * as projects from './projects.json';
import * as ramblings from './ramblings.json';
import { ReflectionsBlog, AllProjects } from './types';

export const getProjects = (path: string): Promise<AllProjects> => {
  try {
    return fetchJSONData(path);
  } catch (err) {
    console.error('Error fetching data, using fallback project data.');
    return JSON.parse(JSON.stringify(projects));
  }
};

export const getRamblings = async (path: string): Promise<ReflectionsBlog> => {
  try {
    return fetchJSONData(path);
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
const fetchJSONData = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, { method: 'GET', headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error();
  return response.json();
};