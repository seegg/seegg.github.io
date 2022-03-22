export interface Project {
  name: string,
  url: string | null,
  repo: string | null,
  image: string,
  description: string
}
export interface NavigationHook {
  [key: string]: (fromTab: number, toTab: number, tabs: HTMLElement[]) => void
}