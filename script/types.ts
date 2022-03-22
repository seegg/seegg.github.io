export interface Project {
  name: string,
  url: string | null,
  repo: string | null,
  image: string,
  description: string
}
export type NavigationHook = (tabs: HTMLElement[], fromTab: number, toTab: number) => void;