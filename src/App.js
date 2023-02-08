import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes';
import './App.css';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <RouterProvider router={routes}/>
      <Toaster/>
    </>
  );
}

export default App;
