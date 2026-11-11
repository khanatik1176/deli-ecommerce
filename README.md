# deli-ecommerce

Frontend for Deli Ecommerce, built with:

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) v4
- [TanStack Query](https://tanstack.com/query) for server state
- [Axios](https://axios-http.com) for HTTP requests

## Getting started

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_API_URL
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                  # routes, layouts, global styles
  lib/
    api/axios.ts        # shared axios instance (baseURL, interceptors)
    query-client.ts     # QueryClient factory with default options
  providers/
    query-provider.tsx  # QueryClientProvider + React Query Devtools
```

## Fetching data

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";

export function Products() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data,
  });
  // ...
}
```
