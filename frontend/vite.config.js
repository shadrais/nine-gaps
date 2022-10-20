import { viteExternalsPlugin } from 'vite-plugin-externals'

export default {
  plugins: [
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
      // value support chain, transform to window['React']['lazy']
      lazy: ['React', 'lazy'],
    }),
  ],
}
