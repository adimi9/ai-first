-- Custom Types
CREATE TYPE priority AS ENUM ('Low Priority', 'High Priority');
CREATE TYPE status AS ENUM (
    'Not Started',
    'On Track',
    'At Risk',
    'Delayed',
    'Completed',
    'On Hold'
);
-- Functions
CREATE FUNCTION update_last_updated_column() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.last_updated = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;
-- Tables
CREATE TABLE objectives (
    objective_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description text NOT NULL,
    problem_statement text,
    team text NOT NULL,
    assigned_to text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE key_results (
    key_result_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    objective_id integer NOT NULL,
    description text NOT NULL,
    priority priority NOT NULL,
    status status DEFAULT 'Not Started' NOT NULL,
    progress integer DEAFULT 0 NOT NULL,
    target_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (objective_id) REFERENCES objectives(objective_id) ON DELETE CASCADE
);
CREATE TABLE key_result_dependencies (
    key_result_id integer NOT NULL,
    depends_on_key_result_id integer NOT NULL,
    PRIMARY KEY (key_result_id, depends_on_key_result_id),
    FOREIGN KEY (key_result_id) REFERENCES key_results(key_result_id) ON DELETE CASCADE,
    FOREIGN KEY (depends_on_key_result_id) REFERENCES key_results(key_result_id) ON DELETE CASCADE,
    CHECK (key_result_id <> depends_on_key_result_id)
);
CREATE TABLE comments (
    comment_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    key_result_id integer NOT NULL,
    FOREIGN KEY (key_result_id) REFERENCES key_results(key_result_id) ON DELETE CASCADE
);
-- Indexes
CREATE INDEX idx_comments_key_result_id ON comments(key_result_id);
CREATE INDEX idx_key_results_parent_id ON key_results(objective_id);
-- Triggers
CREATE TRIGGER update_key_results_last_updated BEFORE
UPDATE ON key_results FOR EACH ROW EXECUTE FUNCTION update_last_updated_column();
CREATE TRIGGER update_objectives_last_updated BEFORE
UPDATE ON objectives FOR EACH ROW EXECUTE FUNCTION update_last_updated_column();