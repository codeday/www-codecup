import './App.css';
import {BarChart2, Flag, Home, LogOut, Menu, User} from 'react-feather';
import Glitch from './components/Glitch/Glitch';
import logo from './logo.svg';
import Particles from 'react-particles-js';
import React, {Component} from 'react';
import Sidebar from './components/Sidebar/Sidebar';
class App extends Component
{
  constructor()
  {
    super();

    //Initial state
    this.state = {
      isMenuVisible: false
    };

    //Bind event handlers
    this.updateMenu = this.updateMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  //Update the menu state
  updateMenu(isVisible)
  {
    this.setState({
      isMenuVisible: isVisible
    });
  }

  //Toggle the menu visibility
  toggleMenu()
  {
    this.setState(state =>
    {
      return {
        isMenuVisible: !state.isMenuVisible
      };
    });
  }

  render()
  {
    return (
      <div className="App">
        <Sidebar isVisible={this.state.isMenuVisible} onChange={this.updateMenu}>
          <ul className="Menu-list">
            <li>
              <div className="Menu-item">
                <Home />
                <p>Home</p>
              </div>
            </li>
            <li>
              <div className="Menu-item">
                <Flag />
                <p>Challenges</p>
              </div>
            </li>
            <li>
              <div className="Menu-item">
                <BarChart2 />
                <p>Leader Board</p>
              </div>
            </li>
            <li>
              <div className="Menu-item">
                <User />
                <p>Account</p>
              </div>
            </li>
          </ul>

          <ul className="Menu-list Menu-bottom">
            <li>
              <div className="Menu-item">
                <LogOut />
                <p>Log Out</p>
              </div>
            </li>
          </ul>
        </Sidebar>

        <header className="Header">
          <div className="Header-left">
            <button className="Menu-button" onClick={this.toggleMenu}>
              <Menu className="Menu-icon" />
            </button>
            <img src={logo} className="Logo" alt="Code Cup Logo" />
            <Glitch className="Title">CodeCup</Glitch>
          </div>

          <div className="Header-right">
            <img src="https://avatars.dicebear.com/api/bottts/codeday.svg" className="Avatar" alt="Avatar" />
          </div>
        </header>

        <main className="Main">
          <div style={{margin: '0 auto', width: 'fit-content'}}>
            <p>Features:</p>
            <ol style={{textAlign: 'left'}}>
              <li>Variable-based theming</li>
              <li><a href="https://feathericons.com/">Feather Icons</a></li>
              <li>Bare bones (Only 2 extra dependencies)</li>
            </ol>
          </div>
          <div style={{margin: '0 auto', width: 'fit-content'}}>
            <p>Todo:</p>
            <ol style={{textAlign: 'left'}}>
              <li>Add <a href="https://reactrouter.com">React Router</a></li>
              <li>Add pages</li>
              <li>Add <a href="https://www.apollographql.com/docs/react/">Apollo</a></li>
              <li>Add tests</li>
            </ol>
          </div>
        </main>

        <footer className="Footer">
          <p>A project of <a href="https://codeday.org">CodeDay</a>. Licensed under the <a href="https://opensource.org/licenses/MIT">MIT Open Source License</a>.</p>
        </footer>

        <Particles className="Particles" params={{particles: {move: {speed: 0.2}}}} />
      </div>
    );
  }
}

export default App;
