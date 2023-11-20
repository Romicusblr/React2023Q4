import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { laureatesApi } from '@/api/laureates';

const middlewares = [thunk, laureatesApi.middleware];
const mockStore = configureMockStore(middlewares);

export default mockStore;
