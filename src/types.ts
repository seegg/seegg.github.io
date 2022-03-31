export interface Project {
  name: string,
  url: string | null,
  repo: string | null,
  image: string,
  description: string
}

export interface AllProjects {
  projects: Project[],
  'test-projects': Project[]
}
interface Rambling {
  title: string,
  text: string
}

export interface ReflectionsBlog {
  ramblings: Rambling[]
}

export type NavigationHook = (tabs: HTMLElement[], fromTab: number, toTab: number) => void;

export type UpdateDeckFn = (duration: number) => Promise<void>;

export type CardFn = (deck: HTMLElement[], start: number, end: number, waitPerCard: number) => Promise<void>;

export type loadImageCallback = ((img: HTMLImageElement, evt?: Event | string) => void) | null;