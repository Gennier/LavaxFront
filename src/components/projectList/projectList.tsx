import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import { projects, removeProjectMutation } from '../../../api/query';

const ProjectList = (props) => {
  const [hasMore, onChangeHasMore] = useState(true);
  const [searchKey, onChangeSearch] = useState('');
  const [filterKey, onChangeFilter] = useState('');

  const [removeProject] = useMutation(removeProjectMutation, {
    onCompleted() {
      refetch();
    },
  });

  const { data, loading, error, refetch, fetchMore } = useQuery(
    projects,
    {
      variables: {
        filter: filterKey,
        offset: 0,
        limit: 10,
      },
    },
  );

  if (loading) return <p>Loading...</p>;

  const handleRemove = async (id) => {
    await removeProject({
      variables: { id },
    });
  };

  if (props.fetchAgain) {
    refetch();
  }

  const onChangeFetch = () => {
    onChangeFilter(searchKey);
  };

  const editProject = (project) => {
    props.onEdit(project);
  };

  const addFreelancer = () => {
    props.onAdd();
  };

  const getMore = () => {
    fetchMore({
      variables: {
        offset: data.getAllProjects.length,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult.getAllProjects.length === 0) {
          onChangeHasMore(false);
          return prev;
        }
        const getAllProjects = data.getAllProjects.concat(
          fetchMoreResult.getAllProjects,
        );
        return { getAllProjects };
      },
    });
  };

  return (
    <div>
      <div className="row row-spacebetween row-center mb-4">
        <input
          type="text"
          className="search-input"
          placeholder="Search by project name"
          onChange={(e) => onChangeSearch(e.target.value)}
          value={searchKey}
          onKeyPress={(e) =>
            e.key === 'Enter' ? onChangeFetch() : null
          }
        />
        <button
          type="button"
          className="btn btn-lg btn-primary"
          onClick={() => addFreelancer()}
        >
          ADD NEW
        </button>
      </div>
      <div className="separator mb-4"></div>
      <div>
        <InfiniteScroll
          dataLength={data.getAllProjects.length}
          next={() => getMore()}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>End of List</p>}
        >
          {data.getAllProjects.map((project) => (
            <div
              key={project.id}
              className="card d-flex flex-grow-1 mb-3 row"
            >
              <div className="card-body">
                <div
                  className="c-pointer w-100"
                  onClick={() => editProject(project)}
                >
                  <div className="w-100 row row-spacebetween row-center">
                    <p className="w-20 text-small">
                      {project.projectname}
                    </p>
                    <p className="w-20 text-small text-muted">
                      {project.payout}
                    </p>
                  </div>
                  <div>
                    <div className="row row-center w-100">
                      <p className="text-small mr-2 mb-0">
                        Freelancers:
                      </p>
                      {project.freelancers.map((f) => (
                        <div key={f.id}>
                          <p className="text-small text-muted mb-0">
                            {f.email},
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-self-center pr-4 ">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warn"
                  onClick={() => handleRemove(project.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProjectList;
