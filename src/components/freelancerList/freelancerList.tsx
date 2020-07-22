import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  freelancer,
  removeFreelancerMutation,
} from '../../../api/query';

const FreelancerList = (props) => {
  const [hasMore, onChangeHasMore] = useState(true);
  const [searchKey, onChangeSearch] = useState('');
  const [filterKey, onChangeFilter] = useState('');

  const [removeFreelancer] = useMutation(removeFreelancerMutation, {
    onCompleted() {
      refetch();
    },
  });

  const { data, loading, error, refetch, fetchMore } = useQuery(
    freelancer,
    {
      variables: {
        filter: filterKey,
        offset: 0,
        limit: 6,
      },
    },
  );

  if (loading) return <p>Loading.....</p>;

  const handleRemove = async (id) => {
    await removeFreelancer({
      variables: { id },
    });
  };

  if (props.fetchAgain) {
    refetch();
  }

  const onChangeFetch = () => {
    onChangeFilter(searchKey);
  };

  const editFreelancer = (f) => {
    props.onEdit(f);
  };

  const addFreelancer = () => {
    props.onAdd();
  };

  const getMore = () => {
    fetchMore({
      variables: {
        offset: data.getAllFreelancer.length,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult.getAllFreelancer.length === 0) {
          onChangeHasMore(false);
          return prev;
        }
        const getAllFreelancer = data.getAllFreelancer.concat(
          fetchMoreResult.getAllFreelancer,
        );
        return { getAllFreelancer };
      },
    });
  };

  return (
    <div>
      <div className="row row-spacebetween row-center mb-4">
        <div>
          <input
            type="text"
            className="search-input"
            placeholder="Search by email"
            onChange={(e) => onChangeSearch(e.target.value)}
            value={searchKey}
            onKeyPress={(e) =>
              e.key === 'Enter' ? onChangeFetch() : null
            }
          />
        </div>

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
          dataLength={data.getAllFreelancer.length} //This is important field to render the next data
          next={() => getMore()}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>End of List</p>}
        >
          {data.getAllFreelancer.map((f) => (
            <div
              key={f.id}
              className="card d-flex flex-grow-1 mb-3 row"
            >
              <div className="card-body">
                <div
                  className="c-pointer w-100"
                  onClick={() => editFreelancer(f)}
                >
                  <div className="w-100 row row-spacebetween row-center">
                    <p className="w-20 text-small">{f.fullname}</p>
                    <p className="w-20 text-small text-muted">
                      {f.email}
                    </p>
                    <p className="w-20 text-small text-muted">
                      {f.location}
                    </p>
                  </div>
                  <div>
                    <div className="row row-center w-100">
                      <p className="text-small mr-2 mb-0">Skills: </p>
                      <p className="text-small text-muted mb-0">
                        {f.skillsets.join()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-self-center pr-4 ">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warn"
                  onClick={() => handleRemove(f.id)}
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

export default FreelancerList;
