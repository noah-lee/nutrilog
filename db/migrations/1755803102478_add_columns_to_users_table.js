/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createType("sex_enum", ["male", "female", "other"]);

  pgm.addColumns("users", {
    calories: {
      type: "integer",
      notNull: true,
      default: 2400,
    },
    protein: {
      type: "integer",
      notNull: true,
      default: 150,
    },
    sex: {
      type: "sex_enum",
    },
    age: {
      type: "integer",
    },
    weight: {
      type: "integer",
    },
    height: {
      type: "integer",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns("users", [
    "calories",
    "protein",
    "sex",
    "age",
    "weight",
    "height",
  ]);
  pgm.dropType("sex_enum");
};
