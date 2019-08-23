<?php
   include "../server.php";
   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   // Sanitise URL supplied values
   $usr     = filter_var($obj->usr, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $pass    = hash('sha256',filter_var($obj->pwd, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW));
   // Attempt to query database table and retrieve data
   try {
	    $auth ='Denied'; 
		$stmt = $pdo->query('SELECT * FROM users');
		
        while($data = $stmt->fetch(PDO::FETCH_ASSOC)){

			$usrdb = $data['usrid'];
			$passdb = $data['pass']; 
			$nama = $data['nama']; 
			$email = $data['email'];

			if ((($usr==$usrdb)||($usr==$email))&&($pass==$passdb)){
					$auth ='Granted';
					$ipaddress = $_SERVER['REMOTE_ADDR'];
					$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					$sql = "UPDATE users SET lastlogin= NOW() , ipaddress ='$ipaddress' WHERE usrid='$usrdb'";
					$q = $pdo->prepare($sql);
					$q->execute();
			}
			//else { $auth ='Denied'; }
		}
      // Return data as JSON
      echo json_encode($auth);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   } 


?>