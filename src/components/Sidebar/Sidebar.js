import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

class Sidebar extends Component
{
  render()
  {
    return (
      <div data-testid="Sidebar">
        <div className={this.props.isVisible ? styles.BackgroundVisible : styles.BackgroundInvisible} onClick={() => this.props.onChange(false)}></div>
        <div onClick={() => this.props.onChange(false)}></div>
        <div className={this.props.isVisible ? styles.SidebarVisible : styles.SidebarInvisible}>
          <h1 className="Title">Code Cup</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  onChange: PropTypes.func,
  isVisible: PropTypes.bool
};

Sidebar.defaultProps = {
  isVisible: false
};

export default Sidebar;
