import React from 'react';
import { View, FlatList, Text } from 'react-native';

import MoiveElement from '../component/MoiveElement';

export default function MovieContainer(props) {
  let { data } = props;

  const renderItem = ({ item }) => {
    return <MoiveElement {...item} />;
  };

  const showMovies = () => {
    return (
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    );
  };

  return <View>{data ? showMovies() : undefined}</View>;
}
