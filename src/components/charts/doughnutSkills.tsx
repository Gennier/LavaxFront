import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Doughnut } from 'react-chartjs-2';

import { doughnutChartSkills } from '../../../api/query';

const DoughnutSkills = () => {
  const { data, loading, error } = useQuery(doughnutChartSkills);
  if (loading) return <p>Loading...</p>;
  const chartdata = {
    datasets: [
      {
        data: data.getAllSkills.count,
        backgroundColor: [
          '#823fac',
          '#403f5c',
          '#f7e2c5',
          '#6d0917',
          '#dab5e3',
          '#eefde5',
          '#a70000',
          '#dab5e3',
          '#548078',
        ],
      },
    ],
    labels: data.getAllSkills.skills,
  };
  return (
    <div>
      <div className="card">
        <div className="p-5">
          <p className="text-medium">Skill Sets</p>
        </div>
        <div className="card-body">
          <Doughnut data={chartdata} />
        </div>
      </div>
    </div>
  );
};

export default DoughnutSkills;
