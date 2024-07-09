insert into users (name, email) values 
	('wha', 'wa@gmail.com'), ('ok', 'ok@gmail.com'), ('domi', 'domi@gmail.com');

select * from users;

UPDATE public.users
	SET email='new@gmail.com'
	WHERE name='wha';

select * from users;

DELETE FROM public.users
	WHERE name='wha';

select * from users;

delete from users;