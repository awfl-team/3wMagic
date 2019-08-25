import { Action, createReducer, on } from '@ngrx/store';
import * as TimeModeAction from '../actions/timeMode.actions';

export interface State {
  isActive: boolean;
  turnTimeSet: number;
}

export const initialState: State = {
  isActive: true,
  turnTimeSet: 120,
};

const timeModeReducer = createReducer(
  initialState,
  on(TimeModeAction.updateTimeModeIsActive, (state, { isActive }) => ({ ...state, isActive })),
  on(TimeModeAction.updateTurnTimeSet, (state, { turnTimeSet }) => ({ ...state, turnTimeSet })),
);

export function reducer(state: State | undefined, action: Action) {
  return timeModeReducer(state, action);
}