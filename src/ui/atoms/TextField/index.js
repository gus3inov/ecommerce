import React from 'react';
import {
  Input,
  Label,
  Item,
} from 'native-base';

class TextField extends React.PureComponent {
  onChangeText = (text) => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const {
      name,
      placeholder,
      value,
      secureTextEntry,
    } = this.props;

    return (
      <Item stackedLabel>
        <Label>
          { placeholder }
        </Label>
        <Input
          name={name}
          onChangeText={this.onChangeText}
          value={value}
          autoCapitalize="none"
          secureTextEntry={!!secureTextEntry}
        />
      </Item>
    );
  }
}

export default TextField;
