import React from 'react';
import {Text, StyleSheet} from 'react-native';
import * as Colors from '../assets/colors.json';

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string;
  fontSize: string;
  fontWeight?: string;
  cStyle?: object;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
}) => {
  const setFontSize = (size: string) =>
    size === 'sm' ? 14 : size === 'm' ? 18 : size === 'lg' ? 20 : 38;

  const setFontFamily = (font?: string) => {
    return font === 'bold'
      ? 'PloniMLv2AAA-Bold'
      : font === 'medium'
      ? 'PloniMLv2AAA-Medium'
      : 'PloniMLv2AAA-Regular';
  };

  const styles = StyleSheet.create({
    constants: {
      fontSize: setFontSize(fontSize),
      fontFamily: setFontFamily(fontWeight),
      color: Colors.black,
    },
  });

  return <Text style={[styles.constants, {...cStyle}]}>{children}</Text>;
};

export default TextElement;
