import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextElement from './TextElement';
import * as Colors from '../assets/colors.json';

interface MainModalPropsType {
  title: string;
  content: string;
  saveDocument(): void;
  shareDocument(): void;
}

const MainModal: React.FC<MainModalPropsType> = ({
  title,
  content,
  saveDocument,
  shareDocument,
}) => {
  return (
    <View style={styles.modalContainer}>
      <TextElement cStyle={styles.black} fontSize={'lg'} fontWeight={'bold'}>
        {title}
      </TextElement>
      <View style={styles.scrollview}>
        <ScrollView>
          <TextElement cStyle={styles.black} fontSize={'m'}>
            {content.trim()}
          </TextElement>
        </ScrollView>
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity
          onPress={saveDocument}
          style={styles.button}
          activeOpacity={0.8}>
          <TextElement cStyle={styles.black} fontSize={'m'}>
            Save Document
          </TextElement>
          <TextElement cStyle={styles.black} fontSize={'sm'}>
            (local device)
          </TextElement>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareDocument}
          style={[styles.button, {backgroundColor: Colors.primary}]}
          activeOpacity={0.8}>
          <TextElement cStyle={styles.white} fontSize={'m'}>
            Share Document
          </TextElement>
          <TextElement cStyle={styles.white} fontSize={'sm'}>
            (between apps)
          </TextElement>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get('window').height * 0.7,
    padding: '6%',
    backgroundColor: Colors.white,
  },
  scrollview: {
    height: '80%',
  },
  black: {
    color: Colors.black,
  },
  white: {
    color: Colors.white,
  },
  controllerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: Dimensions.get('window').width * 0.42,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainModal;
