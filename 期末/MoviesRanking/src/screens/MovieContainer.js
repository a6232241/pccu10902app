import React from 'react';
import { View, FlatList } from 'react-native';

import MoiveElement from '../component/MoiveElement';

export default function MovieContainer(props) {
  let { data, lookWho } = props;

  const renderItem = ({ item }) => {
    return <MoiveElement {...item} lookWho={lookWho} />;
  };

  const showMovies = () => {
    return (
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    );
  };

  return <View>{data ? showMovies() : undefined}</View>;
}
