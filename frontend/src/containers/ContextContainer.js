import { EntryProvider } from '../context/EntryContext';
import { LocalProvider } from '../context/LocalContext';

const ContextContainer = props => (
	<EntryProvider>
		<LocalProvider>
			{props.children}
		</LocalProvider>
	</EntryProvider>
);

export default ContextContainer;
