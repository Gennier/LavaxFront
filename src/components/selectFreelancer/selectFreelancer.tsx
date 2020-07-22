import React from 'react';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select';

import { freelancerSelect } from '../../../api/query';

let options = [];

const SelectFreelance = (props) => {
  const [freelancers, onChangeFreelancer] = useState(props.data);

  const { data, loading, error, refetch } = useQuery(
    freelancerSelect,
  );

  if (loading) return <p>Loading...</p>;

  options = data.getAllFreelancerSelect.map((r) => ({
    value: r.id,
    label: r.fullname,
  }));

  const changeData = (e) => {
    onChangeFreelancer(e);
    props.onChange(e);
  };

  return (
    <>
      <Select
        isMulti
        name="freelancer"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(e) => changeData(e)}
        value={freelancers}
      />
    </>
  );
};

export default SelectFreelance;
