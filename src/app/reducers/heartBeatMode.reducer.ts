import { Action, createReducer, on } from '@ngrx/store';
import * as NbPlayersActions from '../actions/heartbeatMode.actions';

export interface State {
  isActive: boolean;
}

export const initialState: State = {
  isActive: false
};

const heartBeatModeReducer = createReducer(
  initialState,
  on(NbPlayersActions.activate, state => ({ ...state, nbPlayers: state.isActive = true })),
  on(NbPlayersActions.desactivate, state => ({ ...state, nbPlayers: state.isActive = false })),
);

export function reducer(state: State | undefined, action: Action) {
  return heartBeatModeReducer(state, action);
}