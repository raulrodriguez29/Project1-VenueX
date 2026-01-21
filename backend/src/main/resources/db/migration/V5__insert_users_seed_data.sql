
INSERT INTO users (email, password_hash, first_name, last_name, phone)
VALUES
('super@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Super', 'User', '555-0100'),
('admin@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Admin', 'User', '555-0101'),
('host@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Host', 'User', '555-0102'),
('josh@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Josh', 'Lian', '555-0103'),
('ashlee@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Ashlee', 'Kang', '555-0104'),
('arjun@test.com', '$2a$10$ByI6560p4Y0m0.Y7G/2bEeR5u9j9pD/89e5k1nI6P8889n7381j/W', 'Arjun', 'Ayyappan', '555-0105');


INSERT INTO user_roles (user_id, role_id)
VALUES
((SELECT id FROM users WHERE email = 'super@test.com'), (SELECT id FROM roles WHERE role_name = 'SUPER_USER')),
((SELECT id FROM users WHERE email = 'admin@test.com'), (SELECT id FROM roles WHERE role_name = 'ADMIN')),
((SELECT id FROM users WHERE email = 'host@test.com'), (SELECT id FROM roles WHERE role_name = 'HOST')),
((SELECT id FROM users WHERE email = 'josh@test.com'), (SELECT id FROM roles WHERE role_name = 'USER')),
((SELECT id FROM users WHERE email = 'ashlee@test.com'), (SELECT id FROM roles WHERE role_name = 'USER')),
((SELECT id FROM users WHERE email = 'arjun@test.com'), (SELECT id FROM roles WHERE role_name = 'USER'));