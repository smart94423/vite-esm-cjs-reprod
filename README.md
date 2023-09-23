```bash
pnpm install
pnpm run build
cd examples/with-vue-plugin/
pnpm run build
```

Observe error. Also observe that the workaround suggested by Node.js doesn't work in dev.

The culprit seems to be that Vite noExternalizes `vue-toast-notification` only in dev but not in build. Is there a reason why Vite isn't consistent about whether it noExternalizes libraries?
