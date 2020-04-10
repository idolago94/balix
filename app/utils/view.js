import { Dimensions} from 'react-native';

const window = Dimensions.get('window');
export const window_width = window.width;
export const window_height = window.height;

export const content_height = window_height-235;
export const content_width = window_width;

export const sliceString = (str, num) => str.length > num ? (`${str.slice(0, num)}...`):(str);