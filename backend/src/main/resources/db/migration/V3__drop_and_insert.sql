ALTER TABLE venues
DROP COLUMN created_at;

ALTER TABLE seat_sections
DROP COLUMN price;

INSERT INTO venues (name, location_id, venue_desc)
VALUES ('AT&T Stadium', 'Arlington TX', 'Home of the Dallas Cowboys');

INSERT INTO seat_sections (venue_id, type, capacity)
VALUES 
(
  (SELECT id FROM venues WHERE name = 'AT&T Stadium'),
  'VIP', 5
),
(
  (SELECT id FROM venues WHERE name = 'AT&T Stadium'),
  'Floor', 10
),
(
  (SELECT id FROM venues WHERE name = 'AT&T Stadium'),
  'Premium', 15
),
(
  (SELECT id FROM venues WHERE name = 'AT&T Stadium'),
  'General', 20
);

INSERT INTO roles (role_name)
VALUES
('GUEST'),
('USER'),
('HOST'),
('ADMIN'),
('SUPER_USER');