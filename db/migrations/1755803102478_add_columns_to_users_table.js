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
    weight: {
      type: "integer",
      notNull: true,
      default: 80,
    },
    height: {
      type: "integer",
      notNull: true,
      default: 175,
    },
    sex: {
      type: "sex_enum",
      default: "male",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns("users", ["calories", "protein", "weight", "height", "sex"]);
  pgm.dropType("sex_enum");
};
