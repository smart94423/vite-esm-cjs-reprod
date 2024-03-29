export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }
export type { Page }
export type { Component }
export type { Config }

import type {
  Config,
  PageContextBuiltInServer,
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
} from 'vite-plugin-ssr/types'
import type { defineComponent } from 'vue'

// See https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type Component = ReturnType<typeof defineComponent>

type Page = Component
type PageProps = Record<string, unknown>
type WrapperComponent = Component

export type PageContextCommon = {
  Page: Page
  pageProps?: PageProps
  config: {
    Layout?: WrapperComponent
  }
}

type PageContextServer = PageContextBuiltInServer<Page> & PageContextCommon
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCommon
type PageContext = PageContextClient | PageContextServer
