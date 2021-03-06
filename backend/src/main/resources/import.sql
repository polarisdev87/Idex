INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999997, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', true, NOW(), 'admin');
INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999998, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'enabled@user.com', true, NOW(), 'user');
INSERT INTO account (id, username, password, first_name, last_name, email, enabled, last_password_reset_date, lower_case_username) VALUES (9999999999, 'manager', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'manager', 'manager', 'manager@user.com', true, NOW(), 'manager');

INSERT INTO authority (id, NAME) VALUES (9999999997, 'ROLE_USER');
INSERT INTO authority (id, NAME) VALUES (9999999998, 'ROLE_ADMIN');
INSERT INTO authority (id, NAME) VALUES (9999999999, 'ROLE_USER_MANAGER');

INSERT INTO account_authority (account_id, authority_id) VALUES (9999999997, 9999999997);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999997, 9999999998);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999998, 9999999997);
INSERT INTO account_authority (account_id, authority_id) VALUES (9999999999, 9999999999);

INSERT INTO tag(id, name, uses) VALUES (9999999999, 'tag1', 31);
INSERT INTO tag(id, name, uses) VALUES (9999999998, 'tag2', 1);
INSERT INTO tag(id, name, uses) VALUES (9999999997, 'tag3', 41);


INSERT INTO idea(id, actual_cost_in_cents, actual_ttm, category, description, expected_cost_in_cents,expected_ttm, stage, submitted_at, title, updated_at, expected_profit_in_cents, actual_profit_in_cents, votes, submitted_by) VALUES (9999999999, 100000, 10, 9999999999, 'Test description 0', 50000, 51, 'Launched', NOW(), 'Test title 1', NOW(), 100, 50, 3, 9999999998);
INSERT INTO idea(id, actual_cost_in_cents, actual_ttm, category, description, expected_cost_in_cents,expected_ttm, stage, submitted_at, title, updated_at, expected_profit_in_cents, actual_profit_in_cents, votes, submitted_by) VALUES (9999999998, 100001, 11, 9999999999, 'Test description 1', 50001, 52, 'Launched', NOW(), 'Test title 2', NOW(), 200000, 300000, 2, 9999999998);
INSERT INTO idea(id, actual_cost_in_cents, actual_ttm, category, description, expected_cost_in_cents,expected_ttm, stage, submitted_at, title, updated_at, expected_profit_in_cents, actual_profit_in_cents, votes, submitted_by) VALUES (9999999997, 100002, 12, NULL ,'Test description 2', 50002, 53, 'Launched', NOW(), 'Test title 3', NOW(), 34567, 23456, 1, 9999999998);

INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999999);
INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999998);
INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999999, 9999999997);
INSERT INTO idea_tag(idea_id, tag_id) VALUES (9999999998, 9999999999);


INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999999, NOW(), 9999999999, 9999999999);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999998, NOW(), 9999999999, 9999999998);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999997, NOW(), 9999999999, 9999999997);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999996, NOW(), 9999999998, 9999999999);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999995, NOW(), 9999999998, 9999999998);
INSERT INTO public.vote(id, submitted_at, idea, submitted_by) VALUES (9999999994, NOW(), 9999999997, 9999999999);
