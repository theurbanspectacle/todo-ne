import React from "react";
import { UserAvatarFilled } from "@carbon/icons-react";
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

export default function Header() {
  const navigate = useNavigate();

  const accountClick = () => {
    navigate('/login');
  };

  const homeClick = () => {
    navigate('/');
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
          <HeaderGlobalAction aria-label="Account" tooltipAlignment="end" onClick={accountClick}>
            <UserAvatarFilled />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </CarbonHeader>
    </Theme>
  );
}
