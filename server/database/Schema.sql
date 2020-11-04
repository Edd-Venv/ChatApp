create table person (
    id_uid UUID PRIMARY KEY,
    person_name VARCHAR(50) NOT NULL,
    password VARCHAR(400) NOT NULL,
    person_image VARCHAR,
    password_reset_token VARCHAR,
    password_reset_expires NUMERIC
);

create table messages (
    first_person_uid UUID NOT NULL REFERENCES person(id_uid),
    second_person_uid UUID NOT NULL REFERENCES person(id_uid),
    texts JSON,
    UNIQUE(first_person_uid , second_person_uid)
);