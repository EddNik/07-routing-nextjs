"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface TanStackProviderProps {
  children: ReactNode;
}
function TanStackProvider({ children }: TanStackProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default TanStackProvider;

// Для типізації пропса children використовуємо стандартний тип React.ReactNode,
//  який описує будь-який вміст, що може бути переданий в компонент: елементи,
//  рядки, числа, масиви елементів або навіть інші компоненти.

// The useState hook ensures the QueryClient is only created once per component lifecycle, preventing unnecessary recreations on re-renders.
