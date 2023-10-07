document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // You can now use the username, email, and password for further processing (e.g., sending to a server).
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  });