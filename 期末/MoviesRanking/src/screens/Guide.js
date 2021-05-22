import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function Guide(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>App名稱：MoviesRanking</Text>
      <Text>作用：搜尋電影排行榜</Text>
      <Text>作者：蔡寬程</Text>
      <Text>學號：A6232241</Text>
      <Button onPress={() => navigation.navigate('Home')} title={'到主頁'} />
    </View>
  );
}
