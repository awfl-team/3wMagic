import { Action, createReducer, on } from '@ngrx/store';
import * as NbPlayersActions from '../actions/nbPlayers.actions';

export interface State {
  nbPlayers: number;
}

export const initialState: State = {
  nbPlayers: 2
};

const nbPlayersReducer = createReducer(
  initialState,
  on(NbPlayersActions.updateNbPlayers, (state, { nbPlayers }) => ({ ...state, nbPlayers })),
);

export function reducer(state: State | undefined, action: Action) {
  return nbPlayersReducer(state, action);
}