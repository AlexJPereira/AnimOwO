import React from 'react'
import Modal from 'react-native-modal';
import { ScrollView, Button, View, StyleSheet } from 'react-native'

export interface EpisodeListProps{
    watchVisible: boolean,
    children?: React.ReactChild[] | React.ReactChild
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EpisodeList(props: EpisodeListProps){
    return(
        <Modal
                backdropOpacity={0.75}
                onBackdropPress={()=>{props.setVisible(false)}}
                isVisible={props.watchVisible}
                style={ComponentStyle.modalLink}> 
                <ScrollView>
                    { props.children }
                </ScrollView>
                <View style={ComponentStyle.linkClose}>
                    <Button 
                        title="CANCELAR"
                        onPress={async ()=>{
                            // cancel function
                            props.setVisible(false)
                        }}/>
                </View>
            </Modal>
    )
}

const ComponentStyle = StyleSheet.create({
    modalLink:{
        flex: 1
    }, 
    linkClose:{
        paddingTop: 20,
        height: 65, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
})