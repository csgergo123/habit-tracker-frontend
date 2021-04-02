import { Intensity } from "./intensity.enum";
import { Regularity } from "./regularity.enum";

export class Habit {
  id: number;

  title: string;

  regularity: Regularity;

  intensity: Intensity;

  color: string;

  startDate: string;

  dateAdded: string;
}
