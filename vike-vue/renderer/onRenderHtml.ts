export default onRenderHtml

import { renderToNodeStream } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr/server'
import { getTitle } from './getTitle.js'
import type { PageContextServer } from './types'
import { createVueApp } from './app'

async function onRenderHtml(pageContext: PageContextServer) {
  let stream: ReturnType<typeof renderToNodeStream> | string
  if (pageContext.Page === undefined) {
    // SSR is disabled (SPA mode)
    stream = ''
  } else {
    const app = createVueApp(pageContext)
    stream = renderToNodeStream(app)
  }

  const title = getTitle(pageContext)
  const titleTag = !title ? '' : escapeInject`<title>${title}</title>`

  const { description } = pageContext.config
  const descriptionTag = !description ? '' : escapeInject`<meta name="description" content="${description}" />`

  const { favicon } = pageContext.config
  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`

  const lang = pageContext.config.lang || 'en'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang='${lang}'>
      <head>
        <meta charset="UTF-8" />
        ${faviconTag}
        ${titleTag}
        ${descriptionTag}
      </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  }
}
