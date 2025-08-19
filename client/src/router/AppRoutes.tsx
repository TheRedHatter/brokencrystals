import type { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RoutePath } from './RoutePath';
import Main from '../pages/main/Main';
import Login from '../pages/auth/Login/Login';
import LoginNew from '../pages/auth/LoginNew/LoginNew';
import Register from '../pages/auth/Register/Register';
import Marketplace from '../pages/marketplace/Marketplace';
import Userprofile from '../pages/main/Userprofile';
import AdminPage from '../pages/auth/AdminPage';
import PasswordCheck from '../pages/auth/LoginNew/PasswordCheck';
import Dashboard from '../pages/auth/Dashboard';
import Chat from '../pages/chat/Chat';
import NotFound from '../pages/NotFound';

export const AppRoutes: FC = () => {
  const user = sessionStorage.getItem('email') || localStorage.getItem('email');

  return (
    <Routes>
      <Route path={RoutePath.Login} element={<Login />} />
      <Route path={RoutePath.LoginNew} element={<LoginNew />} />

      <Route
        path={RoutePath.PasswordCheck}
        element={
          user ? (
            <PasswordCheck />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Home }}
              state={{ from: '/passwordcheck' }}
            />
          )
        }
      />

      <Route path={RoutePath.Register} element={<Register />} />

      <Route
        path={RoutePath.Marketplace}
        element={
          user ? (
            <Marketplace preview={false} />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Login }}
              state={{ from: '/marketplace' }}
            />
          )
        }
      />

      <Route
        path={RoutePath.Userprofile}
        element={
          user ? (
            <Userprofile />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Login }}
              state={{ from: '/userprofile' }}
            />
          )
        }
      />

      <Route
        path={RoutePath.Adminpage}
        element={
          user ? (
            <AdminPage />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Home }}
              state={{ from: '/adminpage' }}
            />
          )
        }
      />

      <Route
        path={RoutePath.Dashboard}
        element={
          user ? (
            <Dashboard />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Home }}
              state={{ from: '/dashboard' }}
            />
          )
        }
      />

      <Route
        path={RoutePath.Chat}
        element={
          user ? (
            <Chat />
          ) : (
            <Navigate
              to={{ pathname: RoutePath.Login }}
              state={{ from: '/chat' }}
            />
          )
        }
      />

      <Route path={RoutePath.Home} element={<Main />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
