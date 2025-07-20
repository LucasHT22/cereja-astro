CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'client')) DEFAULT 'client'
};

CREATE TABLE books {
    id SERIAL PRIMARY KEY,
    title TEXT,
    author TEXT,
    year INT 
};

CREATE TABLE rentals {
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    book_id INT REFERENCES books(id),
    rented_at TIMESTAMP,
    returned_at TIMESTAMP
};