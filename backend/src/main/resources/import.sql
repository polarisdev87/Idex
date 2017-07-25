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

INSERT INTO idea(id, actual_cost_in_cents, actual_ttm, description, expected_cost_in_cents,expected_ttm, stage, submitted_at, title, updated_at, submitted_by) VALUES (9999999999, 100000, 10, 'Test description', 50000, 5, 'Launched', NOW(), 'Test title', NOW(), 9999999998);

INSERT INTO tag(id, name, uses) VALUES (9999999999, 'tag1', 1);
INSERT INTO tag(id, name, uses) VALUES (9999999998, 'tag2', 1);
INSERT INTO tag(id, name, uses) VALUES (9999999997, 'tag3', 1);

INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999999);
INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999998);
INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999997);

INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999999, NOW(), 9999999999, 9999999999);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999998, NOW(), 9999999999, 9999999998);
