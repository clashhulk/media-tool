import React, { PureComponent } from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

const data = [
  {
    subject: "Mediaex",
    A: 120,
    B: 80,
    fullMark: 150,
  },
  {
    subject: "Foster Media",
    A: 125,
    B: 140,
    fullMark: 150,
  },
  {
    subject: "Arrowhead Stations",
    A: 40,
    B: 10,
    fullMark: 150,
  },
  {
    subject: "Channelgenix",
    A: 139,
    B: 60,
    fullMark: 150,
  },
  {
    subject: "Redux Channel",
    A: 75,
    B: 150,
    fullMark: 150,
  },
  {
    subject: "Newsaro",
    A: 135,
    B: 75,
    fullMark: 150,
  },
];

export default class RaChart extends PureComponent {
  render() {
    return (
      <RadarChart
        cx="50%"
        width={400}
        height={400}
        cy="50%"
        outerRadius="80%"
        data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Radar
          name="Lily"
          dataKey="B"
          stroke="#e74469"
          fill="#ffa8bb"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    );
  }
}
