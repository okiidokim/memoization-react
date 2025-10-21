import { QueryClient } from '@tanstack/react-query';

export default function qc() {
  const queryClient = new QueryClient();
  return queryClient;
}
