'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'viem/chains';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const config = getDefaultConfig({
  appName: 'VBEA Staking',
  projectId: '27dfdead3b64d9e6e6401a35369c626d',
  chains: [process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? base : baseSepolia],
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <Notifications
        autoClose={false}
        limit={5}
      />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            locale='en'
            theme={darkTheme({
              overlayBlur: 'small',
              accentColor: 'var(--color-button)',
            })}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  );
}
