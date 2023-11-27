import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 60,
      // cacheTime: 1000 * 20,
      retry: false,
    },
  },
});

export function ReactQueryProvider({ children }: { children: ReactElement }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
