/**
 * Project Name: AI CHATBOT
 * Description: AI powered chatbot with whm you can practise speaking skills.
 *
 * Author: Mariusz Gruszczynski
 * Email: mario.gruszczynski@gmail.com
 * Date: 14th September 2023
*/

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Snackbar from "./components/Snackbar/Snackbar";
import { QueryClient, QueryClientProvider } from 'react-query';
import RequireAuth from "./pages/RequireAuth";

const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      refetchOnmount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5 
    },
  },
})




function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="fallback">Loading...</div>}>
        <Routes>

          {/* public routes */}
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/reset' element={<ResetPassword/>} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* page not found */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        <Snackbar />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App

