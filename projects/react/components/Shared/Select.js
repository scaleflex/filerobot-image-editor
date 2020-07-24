import React, { Component } from "react";
import styled from "styled-components";
import { FileInput } from '../../styledComponents';


class Select extends Component {
  state = {
    isOpened: false
  };

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onOutsideClick);
    document.removeEventListener('mouseup', this.onOutsideClick);
    document.removeEventListener('touchstart', this.onOutsideClick);
    document.removeEventListener('mouseup', this.handleOutsideMouseClick);
    document.removeEventListener('touchstart', this.handleOutsideMouseClick);
  }

  getValue = (value) => {
    const {
      list, placeholder = 'select', valueProp = "id", labelProp = "label", renderLabel, processValue
    } = this.props;
    let label;
    const item = list.find(item => item[valueProp] === value);

    label = processValue ?
      processValue(item, value, list, valueProp, labelProp)
      :
      item && (item[labelProp] && renderLabel ?
      renderLabel(item[labelProp]) :
      item[labelProp]);

    return label ? label : `${placeholder}`;
  };

  toggleMenu = () => {
    const nexVal = !this.state.isOpened;

    if (nexVal) {
      this.onOutsideClick = (e) => { if (e.keyCode === 27) this.toggleMenu(); };
      document.addEventListener('keyup', this.onOutsideClick);
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    } else {
      document.removeEventListener('keyup', this.onOutsideClick);
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }
    this.setState({ isOpened: nexVal });
  };

  handleOutsideMouseClick = event => {
    const { target } = event;

    if (!this.dropdown) return;
    else if ((this.selectedItem && this.selectedItem.contains(target))) return;

    if (this.dropdown.contains(target)) {
      event.stopPropagation();
      return;
    }

    this.setState({ isOpened: false });
  };

  onItemClick = (event, id) => {
    const { onChange, onBlur } = this.props;

    onChange(id, event);
    if (onBlur) onBlur(id);

    this.setState({ isOpened: false });
  };

  filterList = (list) => {
    const { exclude, valueProp = 'id' } = this.props;

    if (exclude && exclude.length)
      return list.filter(item => !exclude.includes(item[valueProp]));

    return list;
  };

  render() {
    const { isOpened } = this.state;
    const {
      value, list, valueProp = 'id', labelProp = 'label', renderLabel, width = '', styles = {}, display,
      style, labelDescription = '', size, small = false, notRelativePosition = false
    } = this.props;
    const getLabel = (item) =>
      item[labelProp] && renderLabel ?
        renderLabel(item[labelProp]) :
        item[labelProp];

    return (
      <SelectWrapper width={width} display={display} styles={styles} style={style} notRelativePosition={notRelativePosition}>

        <SelectedItem
          as="div"
          small={small}
          size={size}
          styles={styles}
          focused={isOpened}
          notSelected={!value}
          onClick={this.toggleMenu}
          ref={(node) => { this.selectedItem = node; }}
          relativePosition={notRelativePosition}
        >{this.getValue(value)} {labelDescription ? `(${labelDescription})` : ''}</SelectedItem>

        <SelectDropdown
          size={size}
          show={isOpened && this.filterList(list).length}
          ref={(node) => { this.dropdown = node; }}
          limitedWidth={notRelativePosition}
        >
          {this.filterList(list).map(item => (
            <SelectDropdownItem
              size={size}
              key={item[valueProp]}
              onClick={(event) => { this.onItemClick(event, item[valueProp]); }}
            >
              {item.color && <ItemIcon color={item.color}/>}
              <ItemName>{getLabel(item)}</ItemName>
            </SelectDropdownItem>
          ))}
        </SelectDropdown>
      </SelectWrapper>
    );
  }
}

const SelectWrapper = styled.div`
  ${p => !p.notRelativePosition && `position: relative;`};
  display: ${p => p.display ? p.display : p.width ? 'inline-block' : 'block'};
  width: ${p => p.width || 'auto'};
  text-align: ${p => p.styles.textAlign ? p.styles.textAlign : 'left'};
`;

const SelectedItem = styled(FileInput).attrs()`
  width: 100%;
  padding: 9px 12px;
  cursor: pointer;
  ${p => p.relativePosition && `position: relative;`}
  
  :hover {
    opacity: ${p => p.styles.opacity && 1};
  }
  
  :after {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -2.5px;
    right: 5px;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-top: 5px solid #fff;
  }
`;

const SelectDropdown = styled.ul`
  display: ${p => p.show ? "block" : "none"};
  list-style-type: none;
  margin: 2px 0 0 0;
  padding: 0;
  position: absolute;
  background: #fff;
  width: ${p => p.limitedWidth ? '111px' : '100%'};
  border: none;
  color: ${p => p.theme.colors.text};
  background: ${p => p.theme.colors.primaryBg};
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.5), 0 1px 0 rgba(82,104,109,.6);
  border-radius: .25rem;
  overflow: hidden;
  overflow-y: auto;
  max-height: ${p => (p.size === 'sm') ? '250px' : '200px'};
  z-index: 101000000000000;
`;

const SelectDropdownItem = styled.li`
  cursor: pointer;
  ${p => getItemStyles(p.size)}
  
  :hover {
    background: ${p => p.theme.colors.primaryBg};
  }
`;

const getItemStyles = size => {
  switch (size) {
    case 'sm':
      return 'padding: .2rem .6rem; font-size: 12px;'
    case 'md':
      return 'padding: .3rem .7rem; font-size: 12px;'
    default:
      return 'padding: .375rem .75rem; font-size: 14px;'
  }
}

const ItemName = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const ItemIcon = styled.span`
  background: ${p => p.color ? p.color : 'transparent'};
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 3px;
  background-size: cover;
`;

export default Select;