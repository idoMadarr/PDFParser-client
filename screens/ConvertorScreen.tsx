import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import axios from 'axios';
import TextElement from '../components/TextElement';
import * as Colors from '../assets/colors.json';
import MainModal from '../components/MainModal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {writeFile} from '../utils/fileStorage';
import RepoIcon from '../assets/vectors/repo.svg';
import LoadingOverlay from '../components/LoadingOverlay';
import Config from 'react-native-config';

const defaultState = {
  title: '',
  content: '',
};

type RootStackParamList = {
  navigation: never;
};

type ConvertorScreenType = NativeStackScreenProps<RootStackParamList>;

const ConvertorScreen: React.FC<ConvertorScreenType> = ({navigation}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState(defaultState);

  useEffect(() => {
    if (fileContent.content.length) {
      bottomSheetRef.current?.snapToIndex(1);
      setIsLoading(false);
    }
  }, [fileContent.content]);

  const shareDocument = async () => {
    await Share.share({
      title: fileContent.title,
      message: fileContent.content,
    });
  };

  const selectPdf = async () => {
    try {
      const pickerResult = await DocumentPicker.pick({
        type: types.pdf,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: pickerResult[0].uri,
        type: pickerResult[0].type,
        name: pickerResult[0].name,
      });

      setIsLoading(true);
      const response = await axios.post(
        `${Config.PRODUCTION_API}parser_pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setFileContent({
        title:
          response.data.info.Title ||
          new Date(Date.now()).toISOString().toString(),
        content: response.data.text,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // const selectImage = () => {
  //   ImagePicker.openPicker(pickerOptions)
  //     .then(async image => {
  //       const formData = new FormData();
  //       formData.append('file', {
  //         uri: image.path,
  //         type: image.mime,
  //         name: image.modificationDate,
  //       });

  //       const response = await axios.post(
  //         'https://pdfparser-server.onrender.com/store_image',
  //         // 'http://192.168.2.77:8080/store_image',
  //         formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       );

  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        onPress={() => setFileContent(defaultState)}
        {...props}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['25%', '70%', '100%'], []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.titleContainer}>
        <TextElement fontWeight={'bold'} cStyle={styles.title} fontSize={'xl'}>
          {'PDF to TXT\nConvertor'}
        </TextElement>
        <TextElement cStyle={styles.lineheight} fontSize={'m'}>
          PDF conversion tool will swiftly transforms PDFs into editable text
          (.TXT) files, enhancing productivity for academic, professional, or
          personal use.
        </TextElement>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore:
            navigation.navigate('repo');
          }}
          style={styles.repoContainer}>
          <RepoIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={selectPdf}
        style={styles.button}
        activeOpacity={0.8}>
        <TextElement fontWeight={'bold'} cStyle={styles.white} fontSize={'lg'}>
          Upload PDF
        </TextElement>
        <TextElement cStyle={styles.white} fontSize={'sm'}>
          (local device)
        </TextElement>
      </TouchableOpacity>
      <View style={styles.availableSection}>
        <TextElement fontSize={'sm'}>
          @ Available and free for unrestricted use.
        </TextElement>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        handleIndicatorStyle={{backgroundColor: Colors.black}}
        backdropComponent={renderBackdrop}
        onClose={() => setFileContent(defaultState)}>
        <MainModal
          title={fileContent.title}
          content={fileContent.content}
          saveDocument={writeFile.bind(
            this,
            fileContent.title,
            fileContent.content,
            () => {
              bottomSheetRef.current?.close();
              // @ts-ignore:
              navigation.navigate('viewer', {
                content: fileContent.content,
                title: fileContent.title,
              });
            },
          )}
          shareDocument={shareDocument}
        />
      </BottomSheet>
      {isLoading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '8%',
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.secondary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.55,
    borderRadius: 200,
    backgroundColor: Colors.secondary,
    elevation: 16,
  },
  titleContainer: {
    justifyContent: 'space-around',
    marginHorizontal: '5%',
    height: '28%',
  },
  repoContainer: {
    position: 'absolute',
    top: '5%',
    right: 0,
  },
  white: {
    color: Colors.white,
  },
  lineheight: {
    lineHeight: 26,
  },
  availableSection: {
    height: '20%',
    justifyContent: 'flex-end',
  },
});

export default ConvertorScreen;
