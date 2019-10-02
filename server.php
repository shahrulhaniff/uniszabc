<?php
   if (empty($_SESSION['user'])) { header("Access-Control-Allow-Origin: *");}
   $hn      = 'localhost';
   $un      = 'id9453057_cashless'; //root
   $pwd     = 'id9453057_cashless';
   $db      = 'id9453057_cashless'; //abc
   $cs      = 'utf8';

	
   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                   );

   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);
?>