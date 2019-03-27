import React, { Component, useContext } from 'react';
import getConnection from './connection';
import { Container, Message } from 'semantic-ui-react';
import FxMenu from './FxMenu';
import './index.css';

const ConnectionContext = React.createContext();

export const useConnection = () => useContext(ConnectionContext);

export class FxApp extends Component {
  state = { connection: null, hasError: false };

  componentDidMount() {
    getConnection().then(connection => {
      const spinner = document.getElementById('fx-spinner');
      spinner && spinner.remove();

      this.setState({ connection });
    });
  }

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    const { title, version, children } = this.props;
    const { connection, hasError } = this.state;
    if (!connection) return null;

    return (
      <ConnectionContext.Provider value={connection}>
        <div id="fx">
          <FxMenu title={title} version={version} />
          {hasError && (
            <Container text style={{ paddingTop: '2em' }}>
              <Message
                error
                header={`${title || 'Application'} could not be launched`}
                content="Please contact LiquidFrameworks Support for assistance"
              />
            </Container>
          )}
          {!hasError && <div id="fx-app">{children}</div>}
        </div>
      </ConnectionContext.Provider>
    );
  }
}
