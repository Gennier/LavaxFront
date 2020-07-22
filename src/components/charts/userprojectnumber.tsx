import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { userprojectNumber } from '../../../api/query';

const UserProjectNumber = () => {
  const { data, loading, error } = useQuery(userprojectNumber);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="w-100 row row-spacebetween row-center row-nowrap mb-4">
        <div className="card w-100 mr-4">
          <div className="p-5">
            <p className="text-medium">
              Frelancers: {data.getCountUserProject.freelancers}
            </p>
          </div>
        </div>
        <div className="card w-100">
          <div className="p-5">
            <p className="text-medium">
              Projects: {data.getCountUserProject.projects}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProjectNumber;
