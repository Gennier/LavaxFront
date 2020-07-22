import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withApollo } from '../../apollo/apollo';
import Modal from 'react-modal';

import {
  addProjectMutation,
  updateProjectMutation,
} from '../../api/query';

import Heading from '../components/heading/heading';
import ProjectList from '../components/projectList/projectList';
import SelectFreelance from '../components/selectFreelancer/selectFreelancer';

Modal.setAppElement('#main');

const customStyles = {
  content: {
    top: '0px',
    left: 'auto',
    right: '0px',
    bottom: '0px',
    marginRight: '0px',
    padding: '0px',
    transform: 'translate(0)',
  },
};

let options = [];

const Projects = () => {
  const [id, onChangeID] = useState('');
  const [name, onChangeName] = useState('');
  const [payout, onChangePayout] = useState('');
  const [freelancers, onChangeFreelancer] = useState([]);
  const [fetchAgain, onChangeFetch] = useState(false);
  const [onEdit, onChangeEdit] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    onChangeEdit(false);
    onChangeID('');
    onChangeName('');
    onChangePayout('');
    onChangeFreelancer([]);
  };
  const handleShow = () => {
    setShow(true);
  };

  const [createProject] = useMutation(addProjectMutation, {
    onCompleted() {
      handleClose();
      onChangeFetch(true);
    },
  });

  const [updateProject] = useMutation(updateProjectMutation, {
    onCompleted() {
      handleClose();
      onChangeFetch(true);
    },
  });

  const handleSubmit = async () => {
    const freelancer = freelancers.map((r) => r.value);

    await createProject({
      variables: { name, payout, freelancer },
    });
  };

  const handleUpdate = async () => {
    const freelancer = freelancers.map((r) => r.value);

    await updateProject({
      variables: { id, name, payout, freelancer },
    });
  };

  const editHandleOpen = (data) => {
    const freelancerSelected = data.freelancers.map((r) => ({
      value: r.id,
      label: r.fullname,
    }));
    onChangeEdit(true);
    handleShow();
    onChangeID(data.id);
    onChangeName(data.projectname);
    onChangePayout(data.payout);
    onChangeFreelancer(freelancerSelected);
  };

  let button;

  if (!onEdit) {
    button = (
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => handleSubmit()}
      >
        Sumbit
      </button>
    );
  } else {
    button = (
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => handleUpdate()}
      >
        Save
      </button>
    );
  }

  return (
    <>
      <div>
        <Heading />
        <ProjectList
          fetchAgain={fetchAgain}
          onAdd={() => handleShow()}
          onEdit={(e) => editHandleOpen(e)}
        />
      </div>
      <Modal
        isOpen={show}
        onRequestClose={() => handleClose()}
        style={customStyles}
        overlayClassName="model-right-overlay"
      >
        <div className="model-content">
          <div className="modal-title">
            <h4>Project</h4>
          </div>
          <div className="separator mb-4"></div>
          <div className="modal-body">
            <form>
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onChangeName(e.target.value)}
                  value={name}
                ></input>
              </div>
              <div className="mt-4">
                <label>Payout</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onChangePayout(e.target.value)}
                  value={payout}
                ></input>
              </div>
              <div className="mt-4">
                <label>Freelancer</label>
                <SelectFreelance
                  data={freelancers}
                  onChange={(e) => onChangeFreelancer(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="row row-center ">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              {button}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default withApollo({ ssr: true })(Projects);
