import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';

import { getTMDB } from '../network/Connector';

import MovieContainer from './MovieContainer';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState(undefined);
  const [TopMovies, setTopMovies] = useState(undefined);
  let popularUrl = '/movie/popular';
  let topUrl = '/movie/top_rated';

  const getMovies = (url) => {
    let title = url.split('/')[2];
    getTMDB(url)
      .then(({ results }) => {
        if (title === 'popular') {
          setPopularMovies(results);
        } else {
          setTopMovies(results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _renderScene = ({ route }) => {
    switch (route.key) {
      case 'popular':
        return <MovieContainer data={popularMovies} />;
      case 'top':
        return <MovieContainer data={TopMovies} />;
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'popular', title: 'Pupular', icon: 'home' },
    { key: 'top', title: 'Top' },
  ]);

  useEffect(() => {
    getMovies(popularUrl);
    getMovies(topUrl);
  }, []);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={setIndex}
      tabBarPosition='bottom'
    />
  );
}

const _renderTabBar = (props) => {
  const _renderLabel = ({ route }) => {
    return route.icon ? (
      <Icon name={route.icon} type='octicon' />
    ) : (
      <Text style={styels.tabBarLabel}>{route.title}</Text>
    );
  };

  return (
    <View>
      <TabBar {...props} renderLabel={_renderLabel} />
    </View>
  );
};

const styels = StyleSheet.create({
  tabBarLabel: { flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 18 },
});
