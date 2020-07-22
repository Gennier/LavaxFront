import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withApollo } from '../../apollo/apollo';
import {
  addFreelancerMutation,
  updateFreelancerMutation,
} from '../../api/query';
import Modal from 'react-modal';
import ChipInput from 'material-ui-chip-input';

import Heading from '../components/heading/heading';
import FreelancerList from '../components/freelancerList/freelancerList';

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

Modal.setAppElement('#main');

const Freelancer = () => {
  const [id, onChangeID] = useState('');
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [location, onChangeLocation] = useState('');
  const [skill, onChangeSkill] = useState([]);
  const [fetchAgain, onChangeFetch] = useState(false);
  const [onEdit, onChangeEdit] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    onChangeEdit(false);
    onChangeID('');
    onChangeName('');
    onChangeEmail('');
    onChangeLocation('');
    onChangeSkill([]);
  };
  const handleShow = () => {
    setShow(true);
  };

  const [createFreelancer] = useMutation(addFreelancerMutation, {
    onCompleted() {
      handleClose();
      onChangeFetch(true);
    },
  });

  const [updateFreelancer] = useMutation(updateFreelancerMutation, {
    onCompleted() {
      handleClose();
      onChangeFetch(true);
    },
  });

  const handleSubmit = async () => {
    await createFreelancer({
      variables: { name, email, location, skill },
    });
  };

  const handleUpdate = async () => {
    await updateFreelancer({
      variables: { id, name, email, location, skill },
    });
  };

  const editHandleOpen = (data) => {
    onChangeEdit(true);
    handleShow();
    onChangeID(data.id);
    onChangeName(data.fullname);
    onChangeEmail(data.email);
    onChangeLocation(data.location);
    onChangeSkill(data.skillsets);
  };

  const handleDeleteChip = (chip, index) => {
    skill.splice(index, 1);
    onChangeSkill(skill);
  };

  const handleAddChip = (chip) => {
    console.log(chip);
    skill.push(chip);
    console.log(skill);
    onChangeSkill(skill);
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
        <FreelancerList
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
            <h4>Freelancer</h4>
          </div>
          <div className="separator mb-4"></div>
          <div className="modal-body">
            <form>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onChangeName(e.target.value)}
                  value={name}
                ></input>
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => onChangeEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
              <div className="mt-4">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onChangeLocation(e.target.value)}
                  value={location}
                ></input>
              </div>
              <div className="mt-4">
                <label>Skill List</label>
                <ChipInput
                  className="form-control"
                  onAdd={(chip) => handleAddChip(chip)}
                  value={skill}
                  onDelete={(chip, index) =>
                    handleDeleteChip(chip, index)
                  }
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

export default withApollo({ ssr: true })(Freelancer);
