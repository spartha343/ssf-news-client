import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './contexts/authProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App lg:max-w-[1280px] lg:mx-auto">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
