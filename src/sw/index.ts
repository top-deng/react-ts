import runtime from 'serviceworker-webpack-plugin/lib/runtime'
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      runtime.register()
    })
  }
}
