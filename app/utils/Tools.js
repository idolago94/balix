import { Animated, Dimensions, Easing, PixelRatio } from 'react-native'
import { content_height } from './view';
import { photo_box } from './style';
// import Color from 'color';
// import EStyleSheet from "react-native-extended-stylesheet";


export const thousandsWithCommas = (num) => (num || num === 0) ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';

// export const thousandsWithCommasAndPoints = (num) => {
//     if (!num) return ''
//     let parts = num.toString().split(".");
//     parts[0] = thousandsWithCommas(parts[0])
//     return parts.join(".");
// }

export const phoneNumberWithDash = (num) => num.toString().replace(/^(\d{3})(\d+)/g, "$1-$2");

export const removeDash = (string) => string.replace(/-/g, '');

export const runAnimation = (animationValue, value) => {
    Animated.timing(animationValue, {
        toValue: value,
        easing: Easing.out(Easing.poly(4)),
        duration: 300,
    }).start();
}

// ----- GENERAL ----

export const getShortMonthName = (monthName) => monthName.slice(0, 3) + '\'';

export const getMonthName = (numberMonth) => {
    const month = numberMonth.toString().slice(4);
    switch (month) {
        case '01':
            return "Januar"
        case '02':
            return "Februar"
        case '03':
            return "March"
        case '04':
            return "April"
        case '05':
            return "May"
        case '06':
            return "June"
        case '07':
            return "July"
        case '08':
            return "August"
        case '09':
            return "September"
        case '10':
            return "Octuber"
        case '11':
            return "November"
        case '12':
            return "December"
        default:
            return ''
    }
}

export const sortByArrayOfKeys = (array, keyField, keysArray) => {
    //example:
    //array: [{name: 'idan', workerType: '3'}, {name: 'stas', workerType: '5'}, {name: 'kirill', workerType: '2'}]
    //keyField: 'workerType'
    // keysArray: ['4', '3', '2', '5', '6']
    array.sort((a, b) => {
        const aIndex = keysArray.indexOf(a[keyField])
        const bIndex = keysArray.indexOf(b[keyField])
        if (aIndex < bIndex) return -1;
        if (aIndex > bIndex) return 1;
        return 0;
    })
}

export const getShortDate = (fullDate, limit) => fullDate.replace(/-/g, '').substring(0, limit)

export const getYear = (YearAndMonth) => YearAndMonth.slice(0, 4)

export const getMonth = (YearAndMonth) => YearAndMonth.substring(4)

export const orderFullDate = (date) => date.substring(6) + '.' + date.substring(6, 8) + '.' + date.substring(0, 4)

export const removeBase64Spaces = (string) => string.replace(/\r?\n|\r/g, '')

export const removeSpaces = (string) => string.replace(/\ /g, '')

export const get4LastIdDigits = (id) => id.substring(id.length - 4, id.length)

export const fixTwoDigits = (numericDate) => numericDate < 10 ? '0' + numericDate : numericDate

export const splitFullAddress = (address) => {
    const spliteAddress = address.split(/(\d+)/).map(a => a.trim())
    let cityName = spliteAddress[2]
    const houseNumberLetter = cityName.split(' ').filter(c => c.length === 1)
    if (houseNumberLetter) {
        cityName = cityName.split(' ').filter((a) => a.length > 1).join(' ')
    }
    const streetName = spliteAddress[0]
    const houseNumber = spliteAddress[1] + houseNumberLetter
    return { cityName, streetName, houseNumber }
}

export const compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

export const replaceToken = (text, token, newToken) => text.replace(new RegExp(token, "g"), newToken)

export const removeSigns = (date) => date.replace(/\/|\./g, '')

export const replaceToYYYYMMDD = (date) => date.substring(4, 8) + date.substring(2, 4) + date.substring(0, 2)

export const capitalizeFirstLetter = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : ''

export const lowerFirstLetter = (string) => string ? string.charAt(0).toLowerCase() + string.slice(1) : ''

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const Base64 = {
    btoa: (input = '') => {
        let str = input;
        let output = '';
        for (let block = 0, charCode, i = 0, map = chars;
            str.charAt(i | 0) || (map = '=', i % 1);
            output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
            charCode = str.charCodeAt(i += 3 / 4);
            if (charCode > 0xFF) {
                console.log("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.")
                // throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                return null
            }
            block = block << 8 | charCode;
        }
        return output;
    },

    atob: (input = '') => {
        let str = input.replace(/=+$/, '');
        let output = '';
        if (str.length % 4 == 1) {
            console.log("'atob' failed: The string to be decoded is not correctly encoded.");
            // throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            return null
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
            buffer = str.charAt(i++);
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }
        return output;
    }
};

export const isDigits = (exp) => (/^\d+$/).test(exp)

export const getJsonFromUrl = (url) => {
    const startQueryIndex = url.indexOf('?') + 1
    if (startQueryIndex == -1) return {}
    const query = url.substr(startQueryIndex);
    let result = {};
    query.split("&").forEach(function (part) {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

export const getParamsStringFromJson = (json) => Object.keys(json).map(key => key + '=' + json[key]).reduce((a, b) => a + '&' + b)

export const encodeArray = (arr) => Base64.btoa(arr.length == 1 ? arr[0].toString() : arr.reduce((a, b) => a + ',' + b))

export const isValidIsraeliID = id => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
}) % 10 === 0;

// export const createShadow = (height = 1, color = "black", opacity = 1, bgColor, width = 0, radius = 0, elevation = 1, props) => {
//     // if (Platform.OS === 'ios') {
//     return {
//         shadowColor: () => Color(EStyleSheet.value(color)),
//         shadowOffset: {
//             width: width,
//             height: height,
//         },
//         shadowOpacity: opacity,
//         shadowRadius: radius,
//         backgroundColor: bgColor == null ? "transparent" : () => Color(EStyleSheet.value(bgColor)),
//         elevation: elevation,
//         ...props
//     }
//     // }
// }

export const getCountryList = () => {
    return new Promise(resolve => {
        fetch('https://restcountries.eu/rest/v2/all').then((response) => response.json())
        .then((result) => {
          let allCountries = result.map((c) => {
            return {
              value: c.name
            }
          });
          resolve(allCountries);
        }).catch(err => console.log(err));
    })
}

export const getCurrenIndexInFlatList = (y) => {
    let view = content_height + photo_box.marginBottom;
    let pointBreak = view*0.6;
    let index = Math.floor((y-pointBreak) / view);
    return index+1;
}

export const getScreenUrl = (routeName, params) => {
    let url = 'balix://' + routeName;
    if(params) {
        url = url + '/';
        Object.keys(params).map((k, i) => {
            i != 0 && (url = url + '&');
            url = url + `${k}=${params[k]}`;
        });
    }
    console.log('balix link: ', url);
    return url;
}