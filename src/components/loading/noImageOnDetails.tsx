import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'

export default function noImageOnDetails(){ 
    return (
        <ContentLoader 
            speed={2}
            width={90}
            height={138}
            viewBox="0 0 90 138"
            backgroundColor="#544C4C"
            foregroundColor="#716767"
            >
            <Rect x="0" y="0" rx="0" ry="0" width="90" height="138" /> 
        </ContentLoader>
    )
}