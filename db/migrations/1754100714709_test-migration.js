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
  pgm.createTable("users", {
    id: "id", // shorthand for serial primary key
    email: { type: "varchar(255)", notNull: true, unique: true },
    name: { type: "varchar(100)", notNull: true },
    password_hash: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      default: "now()",
      notNull: true,
    },
    updated_at: {
      type: "timestamp",
      default: "now()",
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
  pgm.dropTable("users");
};
