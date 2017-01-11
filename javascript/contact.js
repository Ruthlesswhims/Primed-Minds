function validate()
{
		document.getElementById('success').innerHTML = '';

	var message = document.getElementById('message').value;
	var messageMsg = document.getElementById('message-msg');

	var messageRE = /^[-\w]+(?:\W+[-\w]+){0,99}\W*$/;

	if(messageRE.test(message)){
		messageMsg.innerHTML = '';
	} else {
		messageMsg.style.color = '#F00';
		messageMsg.innerHTML = 'Please enter a message (under 100 words).';
}

  var email = document.getElementById('email').value;
  var emailMsg = document.getElementById('email-msg');
  
  var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(emailRE.test(email)){
    emailMsg.innerHTML = '';
  } else {
    emailMsg.style.color = '#F00';
    emailMsg.innerHTML = 'Invalid Email';
  }



	var name = document.getElementById('name').value;
	var error = document.getElementById('name-msg');

	if(name == ""){
		error.style.color = "#F00";
		error="Please enter a name.";
	}

	else{
		error="";
	}

	document.getElementById('name-msg').innerHTML = error;

	if(emailRE.test(email) && messageRE.test(message)&& (name !== "")){
		document.getElementById('success').innerHTML = 'Thank you for your message! We will email you back as soon as possible.';
		document.getElementById('success').style.color = '#0F0';
		document.getElementById('message').value = '';
		document.getElementById('email').value = '';
		document.getElementById('name').value = '';
	}
}