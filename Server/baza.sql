create database baza;
create table Event (`idEvent` int primary key , `date` varchar(45), `cost` int, `type` varchar(45), `name` varchar(45));
create table User (`idUser` int primary key, `login` varchar(45), `password` varchar(45), `cash` int, `ifLogined` boolean);
create table paidEvents (`idEvent` integer references Event (idEvent), `idUser` integer references User (idUser));
