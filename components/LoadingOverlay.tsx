import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import TextElement from './TextElement';
import Colors from '../assets/colors.json';

const LoadingOverlay = () => {
  return (
    <View style={styles.loadingContainer}>
      <TextElement cStyle={styles.white} fontSize={'lg'}>
        Parsing your file
      </TextElement>
      <TextElement cStyle={styles.white} fontSize={'m'}>
        This proccess can take few moments
      </TextElement>
      <ActivityIndicator size={'large'} color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000b6',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  white: {
    color: Colors.white,
  },
});

export default LoadingOverlay;
