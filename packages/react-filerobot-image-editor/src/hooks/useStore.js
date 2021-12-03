/** External Dependencies */
import { useContext } from 'react';

/** Internal Dependencies */
import AppContext from 'context';

const useStore = () => useContext(AppContext);
export default useStore;
