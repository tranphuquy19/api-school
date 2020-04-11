
insert into School(name,code,startDate,state,htmlTitle,htmlBody,htmlBanner,created_at,updated_at) 
values('Test','01','2020-04-10 13:23:44',true,'title','body','banner','2020-04-10 13:23:44','2020-04-10 13:23:44');

insert into Rol(value,description,path,status,created_at,updated_at,schoolId) 
values ('teacher','teacher','inicio',true,'2020-04-10 13:23:44','2020-04-10 13:23:44',1);
insert into Rol(value,description,path,status,created_at,updated_at,schoolId) 
values ('student','teacher','inicio',true,'2020-04-10 13:23:44','2020-04-10 13:23:44',1);
insert into Rol(value,description,path,status,created_at,updated_at,schoolId) 
values ('administrator','teacher','inicio',true,'2020-04-10 13:23:44','2020-04-10 13:23:44',1);