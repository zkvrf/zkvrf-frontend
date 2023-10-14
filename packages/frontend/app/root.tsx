import { Layout } from './components/Layout';
import { ClientHintCheck, getHints, useNonce } from './lib/client-hints';
import { getTheme } from './lib/theme-session.server';
import { cn } from './lib/utils';
import { wagmiConfig } from './lib/wagmi';
import { useTheme } from './routes/action.set-theme';
import { DataFunctionArgs, LinksFunction, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import stylesheet from '~/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'icon',
    href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎲</text></svg>',
  },
];

export const meta: MetaFunction = () => {
  return [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1',
    },
    { title: 'zkVRF' },
  ];
};

export async function loader({ request }: DataFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

export default function App() {
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <Providers>
          <Layout>
            <Outlet />
          </Layout>
        </Providers>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
