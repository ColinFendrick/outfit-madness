import { EntryProvider } from '../context/EntryContext';
import { LocalProvider } from '../context/LocalContext';
import { UserProvider } from '../context/UserContext';

const ContextContainer = props => (
	<UserProvider>
		<EntryProvider>
			<LocalProvider>
				{props.children}
			</LocalProvider>
		</EntryProvider>
	</UserProvider>
);

export default ContextContainer;
