import React, {Component} from 'react';
import styles from './Glitch.module.css';
import PropTypes from 'prop-types';

class Glitch extends Component
{
  render()
  {
    return (
      <this.props.tag
        text={this.props.children}
        className={styles.text}
        data-testid="Glitch"
        style={this.props.style}
      >{this.props.children}</this.props.tag>
    );
  }
}

Glitch.propTypes = {
  style: PropTypes.object,
  tag: PropTypes.string
};

Glitch.defaultProps = {
  style: {
    display: "inline-block"
  },
  tag: "h1"
};

export default Glitch;
