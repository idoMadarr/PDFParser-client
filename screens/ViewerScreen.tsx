import React from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextElement from '../components/TextElement';
import * as Colors from '../assets/colors.json';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ArrowIcon from '../assets/vectors/arrowright.svg';

type RootStackParamList = {
  route: never;
};

type ViewerScreenType = NativeStackScreenProps<RootStackParamList>;

const ViewerScreen: React.FC<ViewerScreenType> = ({route, navigation}) => {
  // @ts-ignore:
  const content = route.params!.content as string;
  // @ts-ignore:
  const title = route.params!.title as string;

  const shareDocument = async () => {
    await Share.share({
      title: 'PDF Parser - Results',
      message: content,
    });
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <TextElement cStyle={styles.black} fontSize={'lg'} fontWeight={'bold'}>
          {title}
        </TextElement>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollview}>
        <ScrollView>
          <TextElement fontSize={'m'}>{content.trim()}</TextElement>
        </ScrollView>
      </View>
      <View style={styles.controllerContainer}>
        <TouchableOpacity
          onPress={shareDocument}
          style={[styles.button, {backgroundColor: Colors.primary}]}
          activeOpacity={0.8}>
          <TextElement cStyle={styles.white} fontSize={'m'}>
            Share Content
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
    flex: 1,
    justifyContent: 'space-between',
    padding: '5%',
    backgroundColor: Colors.white,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollview: {
    height: '85%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    overflow: 'hidden',
    padding: '4%',
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
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    padding: '4%',
  },
});

export default ViewerScreen;
