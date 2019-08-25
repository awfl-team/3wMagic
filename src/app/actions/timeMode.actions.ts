import {createAction, props} from '@ngrx/store';

export const updateTimeModeIsActive = createAction('Update time mode', props<{ isActive: boolean }>());
export const updateTurnTimeSet = createAction('Update time set', props<{ turnTimeSet: number }>());

