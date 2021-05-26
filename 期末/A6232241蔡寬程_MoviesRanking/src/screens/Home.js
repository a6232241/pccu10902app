import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import { Button, Appbar } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import { getTMDB } from '../network/Connector';

import MovieContainer from './MovieContainer';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState(undefined);
  const [TopMovies, setTopMovies] = useState(undefined);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'popular', title: '熱門', icon: 'home' },
    { key: 'top', title: '評分最高', icon: 'thumbsup' },
  ]);
  const [headerTitle, setHeaderTitle] = useState(routes[0].title);

  const [movieUrl, setMovieUrl] = useState({
    popularUrl: '/movie/popular',
    topUrl: '/movie/top_rated',
  });
  const [lookWho, setLookWho] = useState('movie');
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = (url) => {
    setIsLoading(true);
    let title = url.split('/')[2];
    getTMDB(url)
      .then(({ results }) => {
        setIsLoading(false);
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
        return <MovieContainer data={popularMovies} lookWho={lookWho} />;
      case 'top':
        return <MovieContainer data={TopMovies} lookWho={lookWho} />;
      default:
        return null;
    }
  };

  const _handleIndexChange = (index) => {
    setHeaderTitle(routes[index].title);
    setIndex(index);
  };

  const _headleHeaderShowMovies = () => {
    if (lookWho == 'movie') {
      setMovieUrl({ popularUrl: '/tv/popular', topUrl: '/tv/top_rated' });
      setLookWho('tv');
    } else {
      setMovieUrl({
        popularUrl: '/movie/popular',
        topUrl: '/movie/top_rated',
      });
      setLookWho('movie');
    }
  };

  const _renderHeader = () => {
    return (
      <Appbar.Header style={styels.appBarHeader}>
        <Appbar.Content title={headerTitle} />
        {/* <Appbar.Action icon='magnify' onPress={() => {}} /> */}
        <Button mode='text' color='#fff' onPress={_headleHeaderShowMovies}>
          {lookWho == 'movie' ? '我想看TV' : '我想看電影'}
        </Button>
      </Appbar.Header>
    );
  };

  useEffect(() => {
    getMovies(movieUrl.popularUrl);
    getMovies(movieUrl.topUrl);
  }, [movieUrl]);

  return (
    <>
      {_renderHeader()}
      {isLoading ? (
        <Spinner visible={isLoading} textContent={'Loading...'} />
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={_renderScene}
          renderTabBar={_renderTabBar}
          onIndexChange={_handleIndexChange}
          tabBarPosition='bottom'
        />
      )}
    </>
  );
}

const _renderTabBar = (props) => {
  const _renderLabel = ({ route }) => {
    return route.icon ? (
      <Icon name={route.icon} type='octicon' color='#fff' />
    ) : (
      <Text style={styels.tabBarLabel}>{route.key}</Text>
    );
  };

  return (
    <View>
      <TabBar
        {...props}
        renderLabel={_renderLabel}
        indicatorStyle={{ backgroundColor: '#fff' }}
        style={styels.tabBar}
      />
    </View>
  );
};

const styels = StyleSheet.create({
  appBarHeader: { backgroundColor: 'rgba(0,0,0,0.6)' },
  tabBar: { backgroundColor: 'rgba(0,0,0,0.9)' },
  tabBarLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
