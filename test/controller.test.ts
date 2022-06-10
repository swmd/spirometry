import { DateTime } from "luxon";
import { storeReading } from "../src/controller";
import Readings from "../src/store";

const TestData = [
  {
    value: 70,
    created_at: "2022-05-15",
    patient_id: 1,
  },
  {
    value: 90,
    created_at: "2022-04-21",
    patient_id: 1,
  },
  {
    value: 70,
    created_at: "2022-05-25",
    patient_id: 1,
  },
  {
    value: 80,
    created_at: "2022-04-21",
    patient_id: 1,
  },
  {
    value: 80,
    created_at: "2022-06-10",
    patient_id: 1,
  },
];

describe("storeReading function", () => {
  it("should add a new reading", () => {
    storeReading(
      TestData[0].value,
      TestData[0].created_at,
      TestData[0].patient_id
    );
    expect(Readings.length).toBe(1);
  });

  it("should sort by value", () => {
    storeReading(
      TestData[1].value,
      TestData[1].created_at,
      TestData[1].patient_id
    );
    expect(Readings[0].value).toBe(TestData[1].value);
  });

  it("should sort by creation date/time", () => {
    storeReading(
      TestData[2].value,
      TestData[2].created_at,
      TestData[2].patient_id
    );
    expect(Readings[1].created_at).toEqual(
      DateTime.fromISO(TestData[2].created_at)
    );
  });

  it("should not add a duplicate reading", () => {
    storeReading(
      TestData[3].value,
      TestData[3].created_at,
      TestData[3].patient_id
    );
    expect(Readings.length).toBe(3);
  });

  it("should set the manual review flag if the value is 10%+ greater than the average of the past month", () => {
    storeReading(
      TestData[4].value,
      TestData[4].created_at,
      TestData[4].patient_id
    );
    expect(Readings[1].reviewFlag).toBe(true);
  });
});
