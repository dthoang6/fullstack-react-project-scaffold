import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}
/**
 * - We use the App component for setting up TanStack Query libraries and contexts
 * - Now we can make use of TanStack Query inside our Blog Component and its children
 *
 * - It initializing TanStack Query so that the app can manage data fetching, caching, and updating efficiently
 *
 * - QueryClient: a class that manages the cache and state of all your queries, the object will stores all the cached queries, their statuses (loading, error, success) and handles background refetching.
 *
 * - QueryClientProvider: a React context provider that makes the client available to your entire component tree similar to how a Redux provide works. So any component inside Blog can use useQuery, useMutation
 *
 * - Server State Fetch/cache API data: TanStack Query
 * - Client State: React useState, Context API, Redux
 * - GraphQL data: Apollo Client
 * - Server + client with Redux + RTK Query
 */
