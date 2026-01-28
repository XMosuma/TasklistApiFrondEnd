import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskList from './components/TaskList';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <TaskList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
