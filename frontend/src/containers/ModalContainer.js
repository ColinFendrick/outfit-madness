import { Modal } from 'reactstrap';

import useLocalContext from '../hooks/useLocalContext';

const ModalContainer = props => {
	const { toggleModal, uiState } = useLocalContext();

	return (
		<Modal isOpen={!!uiState.modalChildren} toggle={() => toggleModal()()}>
			{props.children}
		</Modal>
	);
};

export default ModalContainer;
