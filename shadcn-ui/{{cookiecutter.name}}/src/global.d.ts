import { QueryClient } from "@tanstack/react-query";

declare global {
  interface Window {
    // This is used to store the query client in the window object so it can be accessed from anywhere
    // and this is needed to use TanStack Query DevTools
    __TANSTACK_QUERY_CLIENT__?: QueryClient;
  }
}
