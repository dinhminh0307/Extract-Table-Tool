let ctr = 0;

function test() {
    document.getElementById('addPropertyButton').addEventListener('click', function() {
        const propertiesContainer = document.getElementById('additionalProperties');
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');
        const inputLabel = document.createElement('label'); // create label then add to class inputgroup
        inputLabel.textContent = 'Property Name:';
        inputGroup.appendChild(inputLabel);
        ctr = 3;
        const inputField = document.createElement('input');
        inputField.type = 'text'; // create input field then added to class
        inputField.name = 'property[]';
        inputField.placeholder = 'Enter property name';
        inputGroup.appendChild(inputField);
    
        propertiesContainer.appendChild(inputGroup);
    });

    document.getElementById('default-table').addEventListener('click', function (event) {
        let elements = document.getElementsByClassName('properties-container'); // select class to delete
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]); // delete class untill it does not have child
        }
    })
}




document.getElementById('resetButton').addEventListener('click', function (event) {
    let form = document.getElementById('urlForm');
    form.reset(); // clear the form
})


