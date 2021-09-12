CREATE SCHEMA blog;


CREATE TABLE blog.post (
    id serial primary key,
    title text not null,
    content text not null,
    date timestamp default now()
)