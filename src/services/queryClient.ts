import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 phút - tránh refetch liên tục khi component remount
      gcTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false, // tắt nếu không cần, đỡ khỏi phải re-render bất ngờ
    },
  },
});