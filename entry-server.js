import { createApp } from './entry'

export default context => {
    return new Promise((resolve, reject) => {
        const { App, router,store } = createApp()
        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state
                resolve(App)
            }).catch(reject)

        }, reject)
    })
}