import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Style from '../../../helpers/style/style';
import InfoTitle from './InfoTitle';
import Icon, { iconNames } from '../../../components/Icon/Icon';

export default class GenderGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {count: 0, color: Style.colors.darkMain, label: 'Male'},
        {count: 0, color: "#993188", label: 'Female'}
      ]
    }
  }

  makeDataForPie(data) {
    const pieData = data
      .map((value, index) => ({
        value: value.count,
        svg: {
          fill: value.color,
        },
          key: `pie-${index}`,
      }));
    return pieData;
  }

  componentDidUpdate(prevProps): void {
    if(prevProps.mostVolunteers != this.props.mostVolunteers) {
      let male_counter = 0;
      let female_counter = 0;

      this.props.mostVolunteers.map(vol => {
        switch (vol.user.gender) {
          case 'male':
            male_counter++;
            break;
          case 'female':
            female_counter++;
            break;
          default: break;
        }
      });

      this.setState({ data: [
          {count: male_counter, color: Style.colors.darkMain, label: 'Male'},
          {count: female_counter, color: "#993188", label: 'Female'}
        ] });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <InfoTitle title="Audience" />
          <View style={{...this.props.style, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <PieChart style={{ height: this.props.height, width: this.props.width }} data={this.makeDataForPie(this.state.data)} />
            <View style={styles.legendBox}>
              <View style={{...styles.legend, flexDirection: 'row'}}>
                <Icon name={iconNames.MALE} size={10} color={this.state.data[0].color} />
                <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontSize: 13}}>
                  {((this.state.data[0].count)/(this.props.mostVolunteers.length/100)).toString().slice(0, 4)}%
                </Text>
              </View>
              <View style={{...styles.legend, flexDirection: 'row'}}>
                <Icon name={iconNames.FEMALE} size={10} color={this.state.data[1].color} />
                <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontSize: 13}}>
                  {((this.state.data[1].count)/(this.props.mostVolunteers.length/100)).toString().slice(0, 4)}%
                </Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: 'center'
  },
  legend: {
    alignItems: 'center'
  }
});
