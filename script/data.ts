import * as projects from './projects.json';
import { Project } from './types';


export const getProjects = (): Project[] => {

  return JSON.parse(JSON.stringify(projects)).projects;
}