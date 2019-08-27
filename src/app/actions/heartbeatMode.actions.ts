import { createAction, props } from '@ngrx/store';

export const updateHeartBeatMode = createAction('Handle Heart Beat Mode', props<{ isActive: boolean }>());
