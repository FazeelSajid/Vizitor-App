import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../../Constants/COLORS";
import { widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen";
import DropDownArrowDown from "../../assets/Svgs/dropDownArrowDown.svg";
import { View } from "react-native";

const DropdownComponent = ({
  itms,
  selectedValue,
  setSelectedValue,
  direction,
  width,
  onchange,
  placeholder
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={itms} // Use itms directly instead of initializing state
      setOpen={setOpen}
      setValue={setSelectedValue}
      style={{ borderColor: COLORS.grayBg, width: wp(40), height: hp(0.5),}}
      dropDownContainerStyle={{
        borderColor: COLORS.grayBg,
        // width: {width},
      }}
      bottomOffset={100}
      closeAfterSelecting={true}
      // arrowIconContainerStyle={{
      //   borderLeftColor: COLORS.grayText,
      //   borderLeftWidth: wp(0.5),
      //   paddingLeft: wp(1),
      // }}
      closeOnBackPressed={true}
      placeholder={placeholder}
      dropDownDirection={direction}
      onChangeValue={onchange}
      ArrowDownIconComponent={()=> <DropDownArrowDown/>}
      Arrowd
    />
  );
};

export default DropdownComponent;
