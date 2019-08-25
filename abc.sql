
create database abc;
use abc;

create table users(
	usrid varchar(10) PRIMARY KEY,
    pass varchar(70),
    nama varchar(30),
    email varchar(30),
    cert varchar(30),
    lastlogin varchar(30),
    ipaddress varchar(30)
);

INSERT INTO `abc`.`users` (`usrid`, `pass`, `nama`, `email`, `cert`, `lastlogin`, `ipaddress`) VALUES ('040471', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'MUHAMMAD SHAHRUL HANIFF', 'shahrul@unisza.edu.my', 'ISMSKPP', NULL, NULL);