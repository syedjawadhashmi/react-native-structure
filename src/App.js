/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { RootStackNav } from './navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { COLORS } from './constants';


const App: () => Node = () => {


  return (
    <SafeAreaView style={styles.app}>
      <RootStackNav />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  app: {  flex: 1, backgroundColor: COLORS.primary },
});


export default App;
