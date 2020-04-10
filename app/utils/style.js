import { content_width, content_height, window_width } from './view';

export const colors = {
    text: 'white',
    background: 'black',
    lightMain: '#11DBDB',
    darkMain: '#0A555F',
    popup: 'rgba(30,33,35,0.5)',
    notch: '#1a1a1a',
    // bar: '#242323',
    bar: '#2D2C2C',
    icon: 'white',
    addBar: 'rgba(56, 56, 56, 0.5)',
    formField: 'rgba(200, 200, 200, 0.2)',
    errorBorder: '#f78b8b',
    errorBackground: 'rgba(255, 72, 72, 0.4)',
    heart: 'red',
    graph: 'rgba(255, 255, 255, 0.7)'
}

export const sizes = {
    icon: 23,
    barHeight: 40,
    fieldWidth: '80%',
    border_radius: 5,
    iphone_notch: 30
}

export const roller = {
    overflow: 'visible', 
    backgroundColor: colors.background, 
    paddingVertical: 1, 
    borderBottomWidth: 1, 
    borderColor: 'gray'
}

export const roller_container = {		
    alignItems: 'flex-end',
    maxHeight: 67
}

export const main_view = {
    backgroundColor: colors.background
}

export const photo_box = {
    marginBottom: 10
}

export const content = {
    width: content_width,
    height: content_height
}

export const emoji_popup_box = {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: window_width,
}
