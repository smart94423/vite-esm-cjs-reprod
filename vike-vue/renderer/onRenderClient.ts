export default onRenderClient

import { createVueApp } from './app.js'
import { getTitle } from './getTitle.js'
import type { PageContextClient } from './types'

let app: ReturnType<typeof createVueApp>
async function onRenderClient(pageContext: PageContextClient) {
  if (!app) {
    const container = document.getElementById('page-view')!
    const ssr = container.innerHTML !== ''
    app = createVueApp(pageContext, ssr)
    if (pageContext.config.vuePlugins) {
      pageContext.config.vuePlugins.forEach(({ plugin, options }) => {
        app.use(plugin, options)
      })
    }
    app.mount(container)
  } else {
    app.changePage(pageContext)
  }

  const title = getTitle(pageContext)
  if (title !== null) {
    document.title = title
  }
}
