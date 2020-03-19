import React, {useEffect, useState} from 'react';
import {ScrollView, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import {Icon as Icon_, Spinner} from 'native-base';

import {getData} from '../helpers/httpServices';

let SCREEN_HEIGHT = Dimensions.get('window').height;

const SCREEN_WIDTH = Dimensions.get('window').width;

export default ImageSliderForDeck = ({userId}) => {
  let [loading, setLoading] = useState(false);
  let [images, setImages] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [finalIndex, setFinalIndex] = useState(0);

  async function scrollNext() {
    if (currentIndex === finalIndex) {
      await setCurrentIndex(0);
      this.list.scrollToIndex({index: 0});
    } else {
      await setCurrentIndex(++currentIndex);
      this.list.scrollToIndex({index: currentIndex});
    }
  }

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      let response = await getData(`user/photos/${userId}`);
      if (response.ok) {
        setLoading(false);
        setImages(response.photos);
        setFinalIndex(response.photos.length - 1);
      }
    }
    loadImages();
  }, [userId]);

  if (loading) {
    return <Spinner color="orange" />;
  } else {
    return (
      <FlatList
        ref={ref => (this.list = ref)}
        indicatorStyle={(color = 'white')}
        data={images}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={async () => await scrollNext()}>
              <ImageLoad
                resizeMode="cover"
                style={{height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH}}
                source={{uri: `${baseurl}/user_images/${item.name}`}}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        initialNumToRender={2}
        updateCellsBatchingPeriod={1}
        updateCellsBatchingPeriod={100}
        windowSize={4}
      />
    );
  }
};
