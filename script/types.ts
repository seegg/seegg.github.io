export interface Project {
  name: string,
  url: string | null,
  repo: string | null,
  image: string,
  description: string
}
export type NavigationHook = (tabs: HTMLElement[], fromTab: number, toTab: number) => void;

export type UpdateDeckFn = (duration: number) => Promise<void>;

export type CardFn = (deck: HTMLElement[], start: number, end: number, waitPerCard: number) => Promise<void>;