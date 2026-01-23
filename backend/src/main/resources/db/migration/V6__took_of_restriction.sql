ALTER TABLE bookings
DROP CONSTRAINT bookings_event_id_fkey;

ALTER TABLE bookings
ADD CONSTRAINT bookings_event_id_fkey
FOREIGN KEY (event_id)
REFERENCES events(id)
ON DELETE CASCADE;

ALTER TABLE payment
DROP CONSTRAINT payment_booking_id_fkey;

ALTER TABLE payment
ADD CONSTRAINT payment_booking_id_fkey
FOREIGN KEY (booking_id)
REFERENCES bookings(id)
ON DELETE CASCADE;

ALTER TABLE tickets
DROP CONSTRAINT tickets_event_seat_section_id_fkey;

ALTER TABLE tickets
ADD CONSTRAINT tickets_event_seat_section_id_fkey
FOREIGN KEY (event_seat_section_id)
REFERENCES event_seat_sections(id)
ON DELETE CASCADE;