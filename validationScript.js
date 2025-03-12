  // JavaScript code for form validation
  document.getElementById('myForm').addEventListener('submit', function(event) 
  {
    // Prevent form from submitting  
    event.preventDefault(); 

      // Retrieve the input field value
      var inputField = document.getElementById('inputField'); 
      var inputValue = inputField.value;

      // Regular expression pattern for alphanumeric input
      // This pattern reflects a-z and 0-9 characters
      var pattern = /^[a-z0-9]+$/i; 

      // Check if the input value matches the pattern
      if (pattern.test(inputValue)) 
      { 
        // Valid input: display confirmation
        alert('Form submitted successfully!'); 
        this.submit(); // Form Submission
      } 
      else 
      {
        // Invalid input: display error message
        alert('Invalid input. Alphanumeric characters only!'); 
      }
  });