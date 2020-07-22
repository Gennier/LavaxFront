import React from 'react';
import { withApollo } from '../../apollo/apollo';

import DoughnutSkills from '../components/charts/doughnutSkills';
import UserProjectNumber from '../components/charts/userprojectnumber';

const HomePage = () => {
  return (
    <div>
      <UserProjectNumber />
      <DoughnutSkills />
    </div>
  );
};

export default withApollo({ ssr: true })(HomePage);
