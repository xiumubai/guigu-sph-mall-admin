import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// piniaPersist(ζδΉε)
pinia.use(piniaPluginPersistedstate)

export default pinia
