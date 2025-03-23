
function validate()
{
	var x = document.getElementById("t1");
	var y = document.getElementById("t2")
	var z = document.getElementById("p1");
	var r = document.getElementById("t3");
	var r1 = document.getElementById("text_data");
	var r2 = document.getElementById("lang");
 
	if (x.value=="") 
		{
      
		document.getElementById("text1").innerHTML="please fill value";
	
		}
	
	if(y.value=="")
      {
		document.getElementById("text2").innerHTML="please fill value";
	
		}
	
    if(r.value=="")
	  {
	  document.getElementById("text3").innerHTML="please fill value";
		  }
	  
	if(z.value=="")
      {
	  document.getElementById("text4").innerHTML="please fill value";
	
	  }
	  
	var rad=check_RadioButton();
	 
	  
	
	  
	  
	if(r2.value=='--Language--')
	  {
	  document.getElementById("text7").innerHTML="please select value";
	
	  }
	  
	if(r1.value=="")
	 {
	  document.getElementById("t").innerHTML="please enter comment";
	
	  }
	if(x!="" && validateField(x) && y!="" && validateField(y) && z!="" && CheckPassword(z) && r!="" && ValidateEmail(r) && r1!="" && r2.value!='--Language--' && rad!="")
	  {
      alert("successfully created account");
	   return true;
 
      }
	  return false;
	  
	}
function checkList(inputtext)
      {
	  
	if(inputtext=='--Language--')
	 {
	   document.getElementById("text7").innerHTML="please select value";
	 return false;
	  
	  }
	  else{
	  
document.getElementById("text7").innerHTML="";
	 return true;
	 }
	 }
function validateField(inputtext)
      { 
	  var format= /^[A-Za-z]+$/; 
	 
	  if(!(inputtext.value.match(format)))
      {
	  
      if(inputtext.id=="t1")
	  {
	  document.getElementById("text1").innerHTML="please enter character only";
    return false;  
	}


	  
	  
	  if(inputtext.id=="t2")
	  {
	  document.getElementById("text2").innerHTML="please enter character only";
	  return false;  
	}
	  }
	 else
	 {
	 if(inputtext.id=="t1")
	  {
	document.getElementById("text1").innerHTML="";
		}
		if(inputtext.id=="t2")
	  {
	document.getElementById("text2").innerHTML="";
	}
	return true;
}
	}
	  
	function CheckPassword(inputtext) 
	{ 
	var format=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
   
	if(!(inputtext.value.match(format)))
	{ 
	document.getElementById("text4").innerHTML="password must be of 8 to 15 length<br>Password must contain one digit,one special character,one uppercase letter and lowercase letter";
	return false;	
	}
	else
	{
	document.getElementById("text4").innerHTML="";
	return true;
	}
	
	}

function ValidateEmail(inputText)
{
var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(!(inputText.value.match(format)))
{
document.getElementById("text3").innerHTML="enter valid email syntax";
return false;
}

	else{
	document.getElementById("text3").innerHTML="";
	return true;
	}
}
   function check_RadioButton() {    
            var getValue = document.querySelector(   
                'input[name="gen"]:checked');   
                
            if(getValue != null) 
			{ 
			 document.getElementById("text5").innerHTML="";
			return getValue;				
            }   
            else {   
               document.getElementById("text5").innerHTML="please check value";
			return "";			   
            }   
        }
		function check_Radio(input) {    
           
            if(input=="") 
			{ 
			
               document.getElementById("text5").innerHTML="please check value";
			 
            }   
            else {   
				   document.getElementById("text5").innerHTML="";
						
            }   
        }
		function check_comment(input) {    
           
            if(input=="") 
			{ 
			
               document.getElementById("t").innerHTML="please check value";
			   return false;
            }   
            else {   
				   document.getElementById("t").innerHTML="";
				   return true;
            }   
        }
