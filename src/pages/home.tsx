import React from 'react';
import { ScrollView, Text } from 'react-native'
import { StyleSheet, View } from 'react-native'; 


const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default function Home() {
    return(
        <ScrollView>
            <Text 
            style={styles.container}
            >Supose that's my homepage.</Text>
        </ScrollView>
    )
}

