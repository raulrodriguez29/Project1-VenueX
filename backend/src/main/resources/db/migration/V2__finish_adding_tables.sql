
CREATE TABLE venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_id VARCHAR(255),
    venue_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE seat_sections (
    id SERIAL PRIMARY KEY,
    venue_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    capacity INT NOT NULL CHECK (capacity > 0),
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    venue_id INT NOT NULL,
    created_by INT NOT NULL,
    approved_by INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE event_seat_sections (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    seat_section_id INT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    remaining_capacity INT NOT NULL CHECK (remaining_capacity >= 0),
    UNIQUE (event_id, seat_section_id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_section_id) REFERENCES seat_sections(id) ON DELETE RESTRICT
);


CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('BOOKED', 'CANCELED')),
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE RESTRICT
);


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    event_seat_section_id INT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (event_seat_section_id) REFERENCES event_seat_sections(id) ON DELETE RESTRICT
);


CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('CREDIT_CARD')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PAID', 'UNPAID')),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);


CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('EMAIL')),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE host_requests (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'DENIED')),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);
