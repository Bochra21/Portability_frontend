import React, { useState } from "react";
import { Card, Grid } from "@nextui-org/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { BarChart, Bar, Cell as BarCell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ["#92beae", "#be92a2"];

const RADIAN = Math.PI / 180;

// Calculate the positions of the label text:
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Statistique = () => {
  const data = [
    { name: "KO", value: 500 },
    { name: "OK", value: 600 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [barChartData] = useState([
    {
      name: 'Page A',
      uv: 1000,
      pv: 1400,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const activeItem = barChartData[activeIndex];

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={4}>
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
               
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend align="center" layout="horizontal" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            
              <ResponsiveContainer width="100%" height={200}>
                <BarChart width={150} height={80} data={barChartData}>
                  <Bar dataKey="uv" onClick={(event) => handleClick(event.activeTooltipIndex)}>
                    {barChartData.map((entry, index) => (
                      <BarCell cursor="pointer" fill={index === activeIndex ? '#a16a62' : '#a2be92'} key={`cell-${index}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
             
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Statistique;
