import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { useWindowDimensions, View } from 'react-native';

export default function NoText(){ 
    const { height, width } = useWindowDimensions();

    return (
        <ContentLoader 
            speed={2}
            width={width}
            height={15}
            viewBox={`0 0 ${width} 15`}
            backgroundColor="#544C4C"
            foregroundColor="#716767"
            >
            <Rect x="0" y="0" rx="0" ry="0" width={width} height="15" /> 
        </ContentLoader>
    )
}