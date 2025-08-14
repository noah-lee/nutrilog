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
  pgm.createTable("food_logs", {
    id: { type: "serial", primaryKey: true },
    user_id: { type: "uuid", references: "users(id)", notNull: true, onDelete: "CASCADE" },
    description: { type: "text", notNull: true },
    calories: { type: "integer", notNull: true },
    protein: { type: "integer", notNull: true },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("activity_logs", {
    id: { type: "serial", primaryKey: true },
    user_id: { type: "uuid", references: "users(id)", notNull: true, onDelete: "CASCADE" },
    description: { type: "text", notNull: true },
    calories: { type: "integer", notNull: true },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("food_logs");
  pgm.dropTable("activity_logs");
};
