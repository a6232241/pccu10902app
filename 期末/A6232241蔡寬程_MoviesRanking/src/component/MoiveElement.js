import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const MoiveElement = (props) => {
  let {
    title,
    original_title,
    release_date,
    poster_path,
    vote_average,
    lookWho,
    name,
    original_name,
    first_air_date,
  } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
      />
      <View style={styles.content}>
        {lookWho == 'movie' ? (
          <>
            <Text style={styles.contentTitle}>{title}</Text>
            <Text>{original_title}</Text>
            <Text>上映日期：{release_date}</Text>
          </>
        ) : (
          <>
            <Text style={styles.contentTitle}>{name}</Text>
            <Text>{original_name}</Text>
            <Text>首播日期：{first_air_date}</Text>
          </>
        )}

        <Text style={styles.contentAverageVote}>{vote_average}</Text>
      </View>
    </View>
  );
};

export default MoiveElement;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    height: 150,
  },
  image: {
    flex: 3,
  },
  content: {
    flex: 10,
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentAverageVote: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
