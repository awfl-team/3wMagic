import { Action, createReducer, on } from '@ngrx/store';
import * as HeartBeatModeAction from '../actions/heartbeatMode.actions';

export interface State {
  isActive: boolean;
}

export const initialState: State = {
  isActive: true
};

const heartBeatModeReducer = createReducer(
  initialState,
  on(HeartBeatModeAction.updateHeartBeatMode, (state, { isActive }) => ({ ...state, isActive })),

);

export function reducer(state: State | undefined, action: Action) {
  return heartBeatModeReducer(state, action);
}