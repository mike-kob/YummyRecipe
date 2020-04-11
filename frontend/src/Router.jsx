import React, { Suspense } from 'react'
import { HashRouter, Switch } from 'react-router-dom'


function Router() {
    return (
        <HashRouter basename='/'>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>

                </Switch>
            </Suspense>
            <Footer />
        </HashRouter>
    )
}


export default Router;