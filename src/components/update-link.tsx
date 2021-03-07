/*<Modal
animationType="slide"
transparent={true}
visible={modalVisible}>
    <View
        style={{
            justifyContent:'center',
            alignItems:'center', 
            flex: 1
        }}>
        <View style={{
                width:300, 
                height:150, 
                backgroundColor:'#c5c5c5'}}>
            <TouchableHighlight
                style={{backgroundColor: '#252121' }}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{
                setModalVisible(!modalVisible)
                RootStackNavigator.navigate('watch-page', params)}}>
                <Text> Temporada 1 </Text>
            </TouchableHighlight>
        </View>
    </View>
</Modal>*/