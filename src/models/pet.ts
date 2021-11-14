export interface PetModel {
  current_progress: number;
  level: number;
  mood_status: "excited" | "neutral" | "happy";
  name: string;
  type: "fuzzball";
}
