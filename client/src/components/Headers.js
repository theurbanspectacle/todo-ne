import React from "react";
import { Login, Logout } from "@carbon/icons-react";
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenuItem,
  Theme
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import AuthService from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate('/login');
  };

  const homeClick = () => {
    navigate('/');
  };

  const logoutClick = () => {
    AuthService.logout();
  };

  const isLoggedIn = () => {
    if (localStorage && typeof localStorage.getItem === 'function') {
      return !!localStorage.getItem('auth_token');
    } else {
      console.error('Unable to read from localStorage');
      return false;
    }
  };

  return (
    <Theme theme="g100">
      <CarbonHeader aria-label="TODO:NE">
        <HeaderName href="#" onClick={homeClick} prefix="TODO:">
          NE
        </HeaderName>
        <HeaderNavigation aria-label="TODO:NE">
          <HeaderMenuItem href="#" onClick={homeClick}>Home</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          {
            isLoggedIn() ? (
              <HeaderGlobalAction aria-label="Log out" tooltipAlignment="end" onClick={logoutClick}>
                <Logout />
              </HeaderGlobalAction>
            ) : (
              <HeaderGlobalAction aria-label="Log in" tooltipAlignment="end" onClick={loginClick}>
                <Login />
              </HeaderGlobalAction>
            )
          }
        </HeaderGlobalBar>
      </CarbonHeader>
    </Theme>
  );
}
