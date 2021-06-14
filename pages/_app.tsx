import 'tailwindcss/tailwind.css'
import '/styles.css'

import React from 'react'
import { AppProps, AppContext } from 'next/app';
import wrapper, { SagaStore } from '../redux/store';
import { END } from 'redux-saga';


function MyApp({ Component, pageProps }: AppProps) {
    return (<Component {...pageProps} />);
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {

    ctx.store && (ctx.store as SagaStore).runSaga();

    // 1. Wait for all page actions to dispatch
    const pageProps = {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        namespacesRequired: ['common']
    };

    // 2. Stop the saga if on server
    if (ctx.store && ctx.req) {
        ctx.store.dispatch(END);
        await (ctx.store as SagaStore).sagaTask.toPromise();
    }

    // 3. Return props
    return {
        pageProps
    };
};

export default wrapper.withRedux(MyApp);