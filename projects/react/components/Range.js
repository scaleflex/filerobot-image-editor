import React, { Component } from 'react';
import styled from 'styled-components';
import { debounce } from 'throttle-debounce';


class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: props.range
    };
  }

  updateWithDebounce = debounce(100, value => {
    this.props.updateRange(value);
  });

  updateRange = (event) => {
    const nextValue = event.target.value;

    this.setState({ range: nextValue }, () => {
      this.updateWithDebounce(nextValue);
    });
  }

  render() {
    const { range } = this.state;
    const { label, min = -100, max = 100, step = 1, labelBefore, labelStyles } = this.props;

    return (
      <Wrapper className="image-editor-range-wrapper" labelBefore={labelBefore} label={label}>
        {label && labelBefore && <label style={labelStyles}>{label}</label>}
        <input
          id="range"
          type="range"
          value={range}
          min={min}
          max={max}
          step={step}
          onChange={this.updateRange}
        />
        {label && !labelBefore && <label style={labelStyles}>{label}</label>}
      </Wrapper>
    )
  }
}

export default Range;


const Wrapper = styled('div').attrs(() => ({
  className: 'image-editor-range'
}))`
  position: relative;
  width: 190px;
  padding: 25px 5px 20px 5px;
  
  label {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: ${p => p.labelBefore ? 0 : '20px'};
  }
  
  :after {
    content: ${p => p.label ? '' : 'unset'};
    display: inline-block;
    position: absolute;
    background: ${p => p.theme.colors.text};
    height: 5px;
    width: 2px;
    top: 45px;
    left: calc(50% - 1px);
  }

  /* CHROME */
  #range {
    -webkit-appearance: none;
    display: block;
    outline: none;
    background: ${p => p.theme.colors.primaryBg};
    height: 6px;
    width: 180px;
    border-radius: 5px;
    margin-bottom: 5px;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${p => p.theme.colors.text};
    }
  }
  
  /* FIREFOX */
  #range::-moz-range-thumb {
    border: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${p => p.theme.colors.text};
    cursor: pointer;
  }
  
  #range::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: ${p => p.theme.colors.text};
    border-radius: 5px;
  }
`;
