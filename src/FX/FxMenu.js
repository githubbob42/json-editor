import React, { useState } from 'react';
import { useConnection } from './index';
import { Popup, Icon, Header, Button } from 'semantic-ui-react';

function FxMenu(props) {
  const { title, version } = props;
  const connection = useConnection();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const { username, display_name, organization_name } = connection.identity;

  return (
    <div id="fx-menu">
      <a href="/apps/dashboard" id="fx-menu-button">
        <svg id="fx-logo" viewBox="-4.5 -5 42 42">
          <path d="M9.625 17.125v4.75h-2.375v-11.813h0.003v-0.003l9.442-0.002 3.079 3.941 4.357-5.997 2.941-0.008-5.777 7.952 4.535 5.804-3.020-0.008-2.967-3.797-5.988 8.242-2.934-0.003 7.401-10.186-2.784-3.563h-5.913v2.316h4.697l0.928 1.188-0.928 1.187h-4.697z" />
        </svg>
      </a>
      <div id="fx-title">
        {title}
        <span id="fx-version">v{version}</span>
      </div>
      <Popup
        id="fx-user-options"
        flowing
        hoverable
        on="click"
        hideOnScroll={true}
        onOpen={() => setUserMenuActive(true)}
        onClose={() => setUserMenuActive(false)}
        trigger={
          <div id="fx-user-button" className={userMenuActive ? 'active' : ''}>
            <span className="name">{display_name}</span>
            <Icon fitted size="large" name="user circle" />
          </div>
        }
        content={
          <div>
            <Header size="small">{organization_name}</Header>
            <Button fluid color="green" animated="vertical" onClick={connection.logout}>
              <Button.Content hidden>Log Out</Button.Content>
              <Button.Content visible>{username}</Button.Content>
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default FxMenu;
