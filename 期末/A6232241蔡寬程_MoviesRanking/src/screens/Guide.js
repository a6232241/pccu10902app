import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Guide(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appName}>MoviesRanking</Text>
        <Text>查看當前最熱門和評分高的電影、影集</Text>
        <Text>作者：蔡寬程</Text>
        <Text>學號：A6232241</Text>
        <Text>資料來源：TMDB</Text>
        <View style={styles.goHomeBtn}>
          <Button onPress={() => navigation.navigate('Home')} title='到主頁' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    maxHeight: '40%',
  },
  appName: {
    fontSize: 20,
  },
  goHomeBtn: {
    width: 160,
    borderRadius: 10,
  },
});
