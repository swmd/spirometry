import { DateTime } from "luxon";
import Readings, { ReadingType } from "./store";

export function storeReading(
  value: number,
  created_at: string,
  patient_id: number
): void {
  // check duplicate input
  const exist = Readings.some((reading) =>
    reading.created_at.equals(DateTime.fromISO(created_at))
  );
  if (exist) {
    console.warn(`Duplicate input: (${value}, ${created_at}, ${patient_id})`);
    return;
  }

  for (var position = 0; position < Readings.length; position++) {
    const reading = Readings[position];

    /*
     find a position to put in the new reading.
     Assumption: Descending order of value, descending order of create time
    */
    if (reading.value < value) {
      break;
    } else if (reading.value === value) {
      if (
        reading.created_at.startOf("day") <
        DateTime.fromISO(created_at).startOf("day")
      ) {
        break;
      }
    }
  }

  let reviewFlag = false;
  const lastMonthValues = Readings.filter(
    (reading) =>
      reading.created_at.plus({ months: 1 }) >= DateTime.fromISO(created_at)
  ).map((reading) => reading.value);
  if (lastMonthValues.length > 0) {
    const monthAverage =
      lastMonthValues.reduce((a, b) => a + b, 0) / lastMonthValues.length;
    if (monthAverage * 1.1 <= value) {
      reviewFlag = true;
    }
  }

  const newReading: ReadingType = {
    value,
    patient_id,
    reviewFlag,
    created_at: DateTime.fromISO(created_at),
  };
  Readings.splice(position, 0, newReading);
}
