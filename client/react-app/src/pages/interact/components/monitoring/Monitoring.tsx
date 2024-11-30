import React, {useContext, useEffect, useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {VisualizationContext} from "../../../../App";
import dayjs from "dayjs";

interface DataTPointI {
  temperature: number;
  time: string;
}

interface DataHPointI {
  humidity: number;
  time: string;
}

const Monitoring = () => {
  const {
    monitoringTemperature,
    monitoringHumidity
  } = useContext(VisualizationContext);

  const [dataT, setDataT] = useState<DataTPointI[]>([])
  const [dataH, setDataH] = useState<DataHPointI[]>([])

  useEffect(() => {
    let tempT = [...dataT, {temperature: monitoringTemperature, time: dayjs().format('mm:ss:SSS')}].slice(-20)
    setDataT(tempT)
    let tempH = [...dataH, {humidity: monitoringHumidity, time: dayjs().format('mm:ss:SSS')}].slice(-20)
    setDataH(tempH)
  }, [monitoringTemperature, monitoringHumidity]);


  return (
    <div className={'card'}>
      <div className={'title'}>Мониторинг</div>


      <ResponsiveContainer width="100%" height="46%">
        <LineChart
          width={500}
          height={300}
          data={dataH}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[25, 65]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="humidity" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>


      <ResponsiveContainer width="100%" height="46%">
        <LineChart
          width={500}
          height={300}
          data={dataT}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[15, 25]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>


    </div>
  );
};

export default Monitoring;