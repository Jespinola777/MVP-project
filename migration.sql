DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todo;
CREATE TABLE users (
    id SERIAL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE todo (
    id SERIAL,
    task_name TEXT,
    prio TEXT
);


