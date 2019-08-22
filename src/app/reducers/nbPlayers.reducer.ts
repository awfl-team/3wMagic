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
  on(NbPlayersActions.increment, state => ({ ...state, nbPlayers: state.nbPlayers + 1 })),
  on(NbPlayersActions.decrement, state => ({ ...state, nbPlayers: state.nbPlayers - 1 })),
);

export function reducer(state: State | undefined, action: Action) {
  return nbPlayersReducer(state, action);
}