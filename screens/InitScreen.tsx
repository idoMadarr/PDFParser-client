import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Colors from '../assets/colors.json';
import LottieView from 'lottie-react-native';

// Components
import TextElement from '../components/TextElement';

type RootStackParamList = {
  navigation: never;
};

type InitScreenType = NativeStackScreenProps<RootStackParamList>;

const InitScreen: React.FC<InitScreenType> = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        // @ts-ignore:
        navigation.navigate('convertor');
      }, 4000);
    }, []),
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <LottieView
        source={require('../assets/lottie/waves.json')}
        autoPlay={true}
        loop={true}
        style={styles.lottie}
      />
      <View style={styles.lottieBG} />
      <TextElement fontSize={'xl'} fontWeight={'bold'}>
        PDF Parser
      </TextElement>
      <TextElement fontSize={'m'}>
        The best pdf parsering tool for mobile
      </TextElement>
      <ActivityIndicator
        size={'small'}
        color={Colors.secondary}
        style={styles.spinner}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    bottom: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.white,
  },
  lottieBG: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#DBF0FF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  spinner: {
    marginTop: '5%',
  },
});

export default InitScreen;
