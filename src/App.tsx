import * as microsoftTeams from '@microsoft/teams-js';
import { TeamsComponentContext, ThemeStyle } from 'msteams-ui-components-react';
import * as React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import { Configure } from './routes/configure';
import { Spotify } from './routes/spotify';

class App extends React.Component {
  public state = {
    fontSize: 16,
    theme: ThemeStyle.Light
  };

  public componentWillMount() {
    // If you are deploying your site as a MS Teams static or configurable tab, you should add ?theme={theme} to
    // your tabs URL in the manifest. That way you will get the current theme on start up (calling getContext on
    // the MS Teams SDK has a delay and may cause the default theme to flash before the real one is returned).
    this.updateTheme(this.getQueryVariable('theme'));
    this.setState({
      fontSize: this.pageFontSize(),
    });

    // If you are not using the MS Teams web SDK, you can remove this entire if block, otherwise if you want theme
    // changes in the MS Teams client to propogate to the page, you should leave this here.
    if (this.inTeams()) {
      microsoftTeams.initialize();
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
    }
  }

  public render() {
    return (
      <TeamsComponentContext
        fontSize={this.state.fontSize}
        theme={this.state.theme}>
        <div className="App">
          <Route exact={true} path="/" component={this.renderComponents('zzzz')} />
          <Route path="/spotify" component={Spotify} />
          <Route path="/configure" component={Configure} />
        </div>
      </TeamsComponentContext>
    );
  }

  public renderComponents(text: string) {
    return () => {
      return <p className="App-intro">
        THIS IS SPARTA {text}
      </p>
    }
  }

  // Grabs the font size in pixels from the HTML element on your page.
  private pageFontSize = () => {
    let sizeStr = window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size');
    sizeStr = sizeStr.replace('px', '');
    let fontSize = parseInt(sizeStr, 10);
    if (!fontSize) {
      fontSize = 16;
    }
    return fontSize;
  }

  // This is a simple method to check if your webpage is running inside of MS Teams.
  // This just checks to make sure that you are or are not iframed.
  private inTeams = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  // Sets the correct theme type from the query string parameter.
  private updateTheme = (themeStr?: string) => {
    let theme;
    switch (themeStr) {
      case 'dark':
        theme = ThemeStyle.Dark;
        break;
      case 'contrast':
        theme = ThemeStyle.HighContrast;
        break;
      case 'default':
      default:
        theme = ThemeStyle.Light;
    }
    this.setState({ theme });
  }

  // Returns the value of a query variable.
  private getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (const varPairs of vars) {
      const pair = varPairs.split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return void 0;
  }
}

export default App;
