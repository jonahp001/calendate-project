-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users" ("firstName", "lastName", "userName", "hashedPassword", "email")
  VALUES
    ('jonah', 'park', 'jonahp', 'qwerty', 'jonah@park.com');

insert into "entries" ("eventDescription", "startTime", "endTime", "notes", "eventDate", "userId")
  VALUES
    ('this is a test event description', '5:00 PM', '8:00 PM', 'this is a test note', 'Apr 13, 2023', '1');
