import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Menentukan apakah user sudah login
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true); // Set user sebagai login
    navigate('/'); // Redirect ke halaman utama
  };

  const handleSignUp = () => {
    setIsAuthenticated(true); // Set user sebagai login
    navigate('/'); // Redirect ke halaman utama
  };

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {!isAuthenticated ? (
        <>
          {/* Redirect dari root ke signin */}
          <Route path="/" element={<Navigate to="/auth/signin" replace />} />

          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Padi Deteksi" />
                <SignIn onSignIn={handleSignIn} />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | Padi Deteksi" />
                <SignUp onSignUp={handleSignUp}/>
              </>
            }
          />
          {/* Redirect semua route unknown ke signin saat belum auth */}
          <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        </>
      ) : (
        <Route
          path="/*"
          element={<DefaultLayout>
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="Dashboard | Padi Deteksi" />
                    <ECommerce />
                  </>
                }
              />
              <Route
                path="/calendar"
                element={
                  <>
                    <PageTitle title="Calendar | Padi Deteksi" />
                    <Calendar />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile | Padi Deteksi" />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements | Padi Deteksi" />
                    <FormElements />
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout | Padi Deteksi" />
                    <FormLayout />
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables | Padi Deteksi" />
                    <Tables />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings | Padi Deteksi" />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart | Padi Deteksi" />
                    <Chart />
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts | Padi Deteksi" />
                    <Alerts />
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons | Padi Deteksi" />
                    <Buttons />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DefaultLayout>
          }
        />
      )}
    </Routes>
  );
}

export default App;
