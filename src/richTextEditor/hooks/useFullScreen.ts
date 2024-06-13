import { useEffect, useState } from 'react';
import { EventEmitter } from 'events';
const FullScreenEmitter = new EventEmitter();

export const useEmitFullScreen = (fullScreen: boolean) => {
    useEffect(() => {
        FullScreenEmitter.emit('fullScreen', fullScreen);
    }, [fullScreen]);
};

export const useFullScreen = (defaultValue: boolean) => {
    const [fullScreen, setFullScreen] = useState(defaultValue);

    useEffect(() => {
        FullScreenEmitter.on('fullScreen', (newVal: boolean) => {
            setFullScreen(newVal);
        });
    }, [fullScreen]);

    return fullScreen;
};
