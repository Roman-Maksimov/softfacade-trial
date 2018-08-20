import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Popup extends PureComponent {
  componentDidMount() {
    window.addEventListener('onKeyDown', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('onKeyDown', this.onKeyPress);
  }

  onKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.onClose();
    }
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    const { item } = this.props;

    return (
      <div className={styles.wrapper} onClick={this.onClose}>
        <div className={styles.popup} onClick={(e) => { e.stopPropagation(); }}>
          <div className={styles.close} onClick={this.onClose} />
          <h1>{item.title}</h1>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
          <a
            className={styles.link}
            href={item.link}
            target="_blank"
          >link</a>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  onClose: () => {},
};

export default Popup;
