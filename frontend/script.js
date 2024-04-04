document.getElementById('addPropertyButton').addEventListener('click', function() {
    const propertiesContainer = document.getElementById('additionalProperties');
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
    
    const inputLabel = document.createElement('label');
    inputLabel.textContent = 'Property Name:';
    inputGroup.appendChild(inputLabel);
    
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = 'property[]';
    inputField.placeholder = 'Enter property name';
    inputGroup.appendChild(inputField);

    propertiesContainer.appendChild(inputGroup);
});


document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Here you would gather the data from the form and handle the submission,
    // such as sending an AJAX request to a server that can process the request.
   alert('Form submitted. Implement AJAX call or form handling logic here.');
});


document.getElementById('urlForm').addEventListener('reset', function(event) {
    event.preventDefault();
    // Here you would gather the data from the form and handle the submission,
    // such as sending an AJAX request to a server that can process the request.
   alert('Delete the form');
});
