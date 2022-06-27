import '../styles/globals.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, store } from '../store';
import { createWrapper } from 'next-redux-wrapper';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

//withRedux wrapper that passes the store to the App Component
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
