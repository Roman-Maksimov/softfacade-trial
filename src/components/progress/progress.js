import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { prefixer } from 'utils';
import styles from './styles.scss';

export class Progress extends PureComponent {
  calculateRatio(value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle(value) {
    return this.props.mode !== 'indeterminate'
      ? { strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(value)}, 400` }
      : undefined;
  }

  circularBufferStyle() {
    return this.circularStyle(this.props.buffer);
  }

  circularValueStyle() {
    return this.circularStyle(this.props.value);
  }

  linearStyle() {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({ transform: `scaleX(${this.calculateRatio(this.props.buffer)})` }),
        value: prefixer({ transform: `scaleX(${this.calculateRatio(this.props.value)})` }),
      };
    }
    return {};
  }

  renderCircular() {
    const { bufferClassName, valueClassName } = this.props;

    return (
      <svg className={styles.circle} viewBox="0 0 60 60">
        <circle
          className={`${styles.pathBuffer} ${bufferClassName}`}
          style={this.circularBufferStyle()}
          cx="30"
          cy="30"
          r="25"
        />
        <circle
          className={`${styles.path} ${valueClassName}`}
          style={this.circularValueStyle()}
          cx="30"
          cy="30"
          r="25"
        />
      </svg>
    );
  }

  renderLinear() {
    const { bufferClassName, valueClassName } = this.props;
    const { buffer, value } = this.linearStyle();

    return (
      <div>
        <span data-ref="buffer" className={`${styles.buffer} ${bufferClassName}`} style={buffer} />
        <span data-ref="value" className={`${styles.value} ${valueClassName}`} style={value} />
      </div>
    );
  }

  render() {
    const { className, disabled, max, min, mode, multicolor, type, value } = this.props;
    const listClassNames = [styles[type]];

    if (mode === 'indeterminate') {
      listClassNames.push(styles.indeterminate);
    }

    if (multicolor) {
      listClassNames.push(styles.multicolor);
    }

    if (className) {
      listClassNames.push(className);
    }

    return (
      <div
        disabled={disabled}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={listClassNames.join(' ')}
      >
        {type === 'circular' ? this.renderCircular() : this.renderLinear()}
      </div>
    );
  }
}

Progress.propTypes = {
  className: PropTypes.string,
  bufferClassName: PropTypes.string.isRequired,
  valueClassName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  multicolor: PropTypes.bool,
  type: PropTypes.oneOf(['linear', 'circular']),
  buffer: PropTypes.number,
  value: PropTypes.number,
};

Progress.defaultProps = {
  className: '',
  bufferClassName: '',
  valueClassName: '',
  max: 100,
  min: 0,
  mode: 'indeterminate',
  multicolor: false,
  type: 'linear',
  buffer: 0,
  value: 0,
};

export default Progress;
