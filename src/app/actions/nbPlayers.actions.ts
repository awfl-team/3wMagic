import { createAction, props } from '@ngrx/store';

export const updateNbPlayers = createAction('Update nbPlayers', props<{ nbPlayers: number }>());
