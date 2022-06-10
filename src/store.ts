import { DateTime } from 'luxon';

export type ReadingType = {
  value: number;
  created_at: DateTime;
  patient_id: number;
  reviewFlag: boolean;
};

const Readings: ReadingType[] = [];

export default Readings;
