

create table reviews(
id serial primary key,
code character varying(255) not null,
company_code character varying(12) not null,
type character varying(25) not null, -- product, event
body_html text,
body text,
user_id integer,
star_rating integer,
like_count integer,
active boolean default true,
deleted_at timestamp without time zone,
created_at timestamp without time zone,
updated_at timestamp without time zone
);


create table review_comments(
id serial primary key,
company_code character varying(12) not null,
like_count integer,
originator_id integer,
body_html text,
body text,
review_id integer,
user_id integer,
created_at timestamp without time zone,
updated_at timestamp without time zone
);

create table review_comment_replies(
id serial primary key,
review_comment_id integer,
company_code character varying(12) not null,
body_html text,
body text,
user_id integer,
created_at timestamp without time zone,
updated_at timestamp without time zone
);


create table abuse_reports(
id serial primary key,
originator_type character varying(12) not null,
originator_id integer,
company_code character varying(12) not null,
body text,
user_id integer, -- optional
created_at timestamp without time zone,
updated_at timestamp without time zone
);

