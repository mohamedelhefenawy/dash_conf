import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CryptoJS  from 'crypto-js'

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));


const secretKey = "s3cr3t$Key@123!";

const decryptFromSessionStorage = (key) => {
  const encryptedValue = sessionStorage.getItem(key);
  if (encryptedValue) {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedValue,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  }
  return null;
};

function App() {

  const token = decryptFromSessionStorage("token");
  const role = decryptFromSessionStorage("role")
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  useEffect(() => {

    if (!token || !role) {
        
        sessionStorage.clear();
        navigate('/auth/signin');
      
    }
  }, [navigate, token, role]);



  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
      setReloadPage(false);
    }
  }, [reloadPage]);

  useEffect(() => {
    const encryptedToken = sessionStorage.getItem("token");
    let decryptedToken = null;

    if (encryptedToken) {
      const secretKey = "s3cr3t$Key@123!";
      decryptedToken = CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(
        CryptoJS.enc.Utf8
      );
    }

    if (decryptedToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = useCallback(() => {
    navigate('/');
    // localStorage.setItem("currentPath", '/');
    // setReloadPage(true);
    console.log('mohamed')
  }, [navigate]);

  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    // localStorage.removeItem("id");
    navigate('/auth/signin');
    // localStorage.setItem("currentPath", ${import.meta.env.VITE_PUBLIC_URL}/);
    // loadingHandle();
  }, [navigate]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn onLogIn = {handleLogin} />} />
        {/* <Route path="/auth/signup" element={<SignUp />} /> */}
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component  />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
