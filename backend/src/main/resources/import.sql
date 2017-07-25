INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999997, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', true, NOW(), 'admin');
INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999998, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'enabled@user.com', true, NOW(), 'user');
INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999999, 'manager', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'user', 'user', 'manager@user.com', true, NOW(), 'manager');

INSERT INTO authority (id, NAME) VALUES (9999999997, 'ROLE_USER');
INSERT INTO authority (id, NAME) VALUES (9999999998, 'ROLE_ADMIN');
INSERT INTO authority (id, NAME) VALUES (9999999999, 'ROLE_USER_MANAGER');

INSERT INTO account_authority (account_id, authority_id) VALUES (9999999997, 9999999997);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999997, 9999999998);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999998, 9999999997);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999999, 9999999999);