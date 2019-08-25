import { Action, createReducer, on } from '@ngrx/store';
import * as LifeSettingAction from '../actions/lifeSetting.actions';

export interface State {
  lifeSetting: number;
}

export const initialState: State = {
  lifeSetting: 20
};

const lifeSettingReducer = createReducer(
  initialState,
  on(LifeSettingAction.updateLife, (state, { lifeSetting }) => ({ ...state, lifeSetting })),
);

export function reducer(state: State | undefined, action: Action) {
  return lifeSettingReducer(state, action);
}