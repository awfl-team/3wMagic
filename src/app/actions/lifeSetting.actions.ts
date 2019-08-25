import {createAction, props} from '@ngrx/store';

export const updateLife = createAction('Life setting Decrement', props<{ lifeSetting: number }>());
