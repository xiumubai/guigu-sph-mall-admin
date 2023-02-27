declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>
declare module 'nprogress'

// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<any>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }
  interface MetaProps {
    icon: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide: boolean
    isFull: boolean
    isAffix: boolean
    isKeepAlive: boolean
  }
}
