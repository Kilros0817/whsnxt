import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../styles';

class SelectDropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            isFocus: false
        }
    }
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  setValue = (value) =>{
    this.setState({value: value})
  }

  setIsFocus = (value) =>{
    this.setState({isFocus: value})
  }

  render() {
    const {
      items,
      color,
      onSelect,
      style,
      borderColor,
      selectedIndex,
      placeholder,
      positionLeft,
      width
    } = this.props;
    return (
        <Dropdown
        onSelect={onSelect}
        style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!this.state.isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={this.state.value}
        onFocus={() => this.setIsFocus(true)}
        onBlur={() => this.setIsFocus(false)}
        onChange={item  => {
          this.setValue(item.value);
          this.setIsFocus(false);
        }}
      />
    );
  }
}

const styles = {
    dropdown: {
        margin: 16,
        height: 40,
        borderColor: "white",
        borderRadius: 22,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 42,
        color: 'white'
      },
      placeholderStyle: {
        fontSize: 16,
        color: 'white'
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
        color: 'white'
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
};

export default SelectDropdown;
