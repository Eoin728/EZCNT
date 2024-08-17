import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import quantitySelectorStyle from "../Styles/quantitySelectorStyles";

export default class QuantitySelector extends PureComponent {
  static defaultProps = {
    minQuantity: 0,
    baseColor: "#b2b2b2",
  };

  static propTypes = {
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number,
    baseColor: PropTypes.string,
    updateCnt: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { quantity: Number(props.value) };
  }

  _onIncreaseQuantity = () => {
    if (
      this.props.maxQuantity === undefined ||
      this.state.quantity < this.props.maxQuantity
    ) {
      this.props.updateCnt(this.state.quantity + 1);
      this.setState({ quantity: this.state.quantity + 1 });
    }
    this.increaseTimer = setTimeout(this._onIncreaseQuantity, 200);
  };

  _onDecreaseQuantity = () => {
    if (
      this.props.minQuantity === undefined ||
      this.state.quantity > this.props.minQuantity
    ) {
      this.props.updateCnt(this.state.quantity - 1);
      this.setState({ quantity: this.state.quantity - 1 });
    }

    this.decreaseTimer = setTimeout(this._onDecreaseQuantity, 200);
  };

  _onStopDecreaseQuantity = () => {
    clearInterval(this.decreaseTimer);
  };

  _onStopIncreaseQuantity = () => {
    clearInterval(this.increaseTimer);
  };

  render() {
    return (
      <View style={[quantitySelectorStyle.container]}>
        <Icon.Button
          size={30}
          backgroundColor="transparent"
          color={this.props.baseColor}
          underlayColor="transparent"
          style={quantitySelectorStyle.actionButton}
          iconStyle={quantitySelectorStyle.icon}
          onPressIn={this._onDecreaseQuantity}
          onPressOut={this._onStopDecreaseQuantity}
          name="remove-circle-outline"
        />
        <View style={{ display: "flex" }}>
          <TextInput
            underlineColorAndroid={this.props.baseColor}
            keyboardType="numeric"
            onChangeText={this._onUpdateQuantity}
            style={[
              quantitySelectorStyle.quantityInput,
              { color: this.props.baseColor },
            ]}
            editable={false}
            value={this.state.quantity.toString()}
          />
        </View>
        <Icon.Button
          size={30}
          color={this.props.baseColor}
          backgroundColor="transparent"
          underlayColor="transparent"
          style={quantitySelectorStyle.actionButton}
          iconStyle={quantitySelectorStyle.icon}
          onPressIn={this._onIncreaseQuantity}
          onPressOut={this._onStopIncreaseQuantity}
          name="add-circle-outline"
        />
      </View>
    );
  }
}
