import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

// 注意: 本番環境ではアクセストークンは OAuth などで動的に取得すること
const GITHUB_TOKEN = 'a4304a13bc6cdd52509c90a38a676fce962ce518';

const cache = new InMemoryCache();
const httpClient = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
});

const apolloClient = new ApolloClient({
  link: httpClient,
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
