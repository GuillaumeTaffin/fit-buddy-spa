import type { WorkoutDao } from './workout';
import { supabase } from '../backend/supabase';

export interface WorkoutsDataSource {
	getAllWorkouts(): Promise<WorkoutDao[]>;
}

export class WorkoutsSupabase implements WorkoutsDataSource {
	async getAllWorkouts(): Promise<WorkoutDao[]> {
		const response = await supabase.from<WorkoutDao>('workouts').select('*');
		return response.data || [];
	}
}
