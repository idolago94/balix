import React from 'react';
import { colors } from '../../utils/style';
import Svg, {Path, LinearGradient, Defs, Stop} from 'react-native-svg';
import { window_width } from '../../utils/view';
// import LinearGradient from 'react-native-linear-gradient';

export default function CurveSvg(props) {
    const l1 = 70;
    const th = 60;
    const pw = 130;
    const h = -25;
    return (
      <Svg height={130} width={window_width} style={{position: 'absolute', top: -70, left: 0}}>
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="22%" stopColor={colors.notch} stopOpacity="1" />
                <Stop offset="15%" stopColor={'black'} stopOpacity="1" />
                {/* <Stop offset="5%" stopColor={'#676262'} stopOpacity="1" /> */}
            </LinearGradient>
        </Defs>
        <Path 
            d={`M 800 ${300} L 0 600 L 0 ${l1} L ${pw} ${l1} C ${pw} 70 ${window_width*0.5} ${h} ${window_width-pw} 70 L ${window_width} ${l1} L ${window_width} 600 `}
            fill="url(#grad)"
        />
      </Svg>
    );
}