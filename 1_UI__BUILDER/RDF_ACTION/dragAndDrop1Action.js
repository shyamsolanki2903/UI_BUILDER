// parameters for elements (dropzone1, elements)
const draggables = document.querySelectorAll('.draggable');
const dropzone1s = document.querySelectorAll('.dropzone1');
let selectedDropzone1 = null;
let dropzone1Count = 1; // Start with 1 because we have a default dropzone1
const MAX_DROPZONE1S = 3;
let labelCounter = 0;

// Inject the CSS class into the document
const style = document.createElement('style');
style.innerHTML = `
//elements inside UI page
            .draggable:hover {
        background-color: #a0b3c7; /* Slightly darker shade */
    }
//toolbox button
           .cool-button {
    position: relative;
    background: #acadac;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Larger, softer shadow */
  }
  .cool-button:active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* Darker and closer shadow */
    transform: translateY(4px); /* Moves the button down slightly */
  }
  .cool-button:hover {
    background-color: #8d8f8c;
  }
  .cool-button:focus {
    outline: none;
  }
        //till here
/* Style Button .........................*/
.style-btn {
    position: relative;
    background-color: #94ad84;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 25px;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Larger, softer shadow */
}
.style-btn:active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* Darker and closer shadow */
    transform: translateY(4px); /* Moves the button down slightly to simulate a push */
}
.style-btn:hover {
    background-color: #7f946e; /* Slightly darker green on hover */
}
.style-btn:focus {
    outline: none;
}
// till here................
// Resizable UI page elements
            #dropzone1, .dropzone1 { 
                position: relative; 
                overflow: hidden; 
                resize: vertical; 
            }
            .dropzone1 {
                position: relative;
                border-radius:20px;
                border:5px solid #333; /* Ensure buttons are positioned relative to the dropzone1 */
            }
           .resize-handle { 
                position: absolute; 
                bottom: 0; 
                left: 0; 
                right: 0; 
                height: 10px; 
                background-color: #3498db; 
                cursor: ns-resize;
                z-index: 5;
            }
            .dropzone1::-webkit-resizer {
                width: 20px;
                height: 20px;
                border-radius: 0%;
                background-color: #333;
                cursor: se-resize;
                }
            .frozen {
                pointer-events: none;
                opacity: 0.7;
                cursor: not-allowed;
            }    
            .dropped-element { 
                position: absolute;
                cursor: move;
                z-index: 10;
                box-sizing: border-box;
            }
            .dropped-element.textarea {
                resize: both;
                overflow: auto;
            }
            .selected-dropzone1 { background-color: #f0f0f0; }
                  .resizable {
            position: relative;
                resize: both; /* Allows resizing in both directions */
                overflow: auto; /* Ensures scrollbars appear when content overflows */
            }
            .resizer {
            width: 10px;
            height: 10px;
            background: #000;
            position: absolute;
            right: 0;
            bottom: 0;
            cursor: se-resize;
            }
           
            .resizable {
                width: 150px; /* Initial width */
                height: 150px; /* Initial height */
                resize: both; /* Enable resizing */
                overflow: auto; /* Ensure scrollbars if content overflows */
            }
            .resizeable-container {
                position: absolute;
                resize: both;
                overflow: hidden;
                border: 2px  transparent ;
                min-width: 50px;
                min-height: 50px;
                cursor: move;
            }
            .resizeable-container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .container-element {
                position: absolute;
                border: 1px solid #ccc;
                background-color: #f9f9f9;
                padding: 5px;
                box-sizing: border-box;
                overflow: hidden;
            }
            .container-content {
                width: 100%;
                height: 100%;
                min-height: 1em;
                outline: none;
            }
            .container-resize-handle {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 10px;
                height: 10px;
                background-color: #3498db;
                cursor: se-resize;
            }
         //Styles button css      
            .custom-button {
                position: relative;
                cursor: pointer;
                overflow: hidden;
            }
            .custom-button span {
                position: relative;
                z-index: 1;
            }
            .custom-button {
                position: relative;
                cursor: pointer;
                border: 1px solid #ccc;
                background-color: #f0f0f0;
                font-size: 14px;
            }
            .custom-button:hover {
                background-color: #e0e0e0;
            }
            .custom {
            position: relative;
            display:none;
                position: fixed; /* Fixes the container to the viewport */
                bottom: 0; /* Positions it at the bottom */
                left: 0; /* Positions it at the left */
                margin: 10px; /* Adds some margin around the container */
                background-color: #f9f9f9; /* Background color */
              
                border-radius: 10px; /* Rounded corners */
                z-index: 1000; /* Ensures it stays above other elements */
            
                display: flex;
                flex-direction: column; /* Aligns contents vertically */
            }
        
            .symbol-container {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
            }
        .symbol-btn-container {
                position: relative;
                margin: 0 3px;
            }
        .content-container {
            padding: 10px;
        }
        .custom {
            position: fixed;
            bottom: 10px;
            left: 10px;
            z-index: 1;
        }
        .symbol-btn:hover {
            background-color: #a6b893;
        }
        * Style for symbol buttons */
      
        /* Hover text above symbol buttons */
        .symbol-btn:hover::after {
            content: attr(title);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 0.75rem;
            white-space: nowrap;
        }
        .symbol-btn-container:hover .hover-text {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.1s ease; /* Instant transition effect */
        }    
    //custom button ends here......................
          
        //nav buttons
            .btn {
                border: none;
                margin-top:5px;
                font-size: 1rem;
                cursor: pointer;
                border-radius: 4px;
            }
                //nav buttons end here..................
                        
            /* Toggle Box Styles */
            .toggle-box {
                position: absolute;
                top: 5px;
                right: 5px;
                background: #fff;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 5px;
                display: none;
                z-index: 1000;
            }
            .toggle-box .btn {
                margin: 0 5px;
                background: none;
                border: none;
                cursor: pointer;
            }
            .dropped-element:hover .toggle-box,
            .dropped-element.selected .toggle-box {
                display: block;
            }
    `;
document.head.appendChild(style);
// dropzone1s 
dropzone1s.forEach(dropzone1 => {
    dropzone1.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    dropzone1.addEventListener('drop', function (event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        if (id && event.target.classList.contains('dropzone1')) {
        }
    });
    dropzone1.addEventListener('click', function () {
        if (selectedDropzone1) {
            selectedDropzone1.classList.remove('selected-dropzone1');
        }
        selectedDropzone1 = dropzone1;
        dropzone1.classList.add('selected-dropzone1');
    });
});
//dropzone1 eventlister ends here.......................................
// Add click event listener to the draggable elements
const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(element => {
    element.addEventListener('click', function () {
        if (selectedDropzone1) {
            const dropzone1Rect = selectedDropzone1.getBoundingClientRect();
            const dropzone1CenterX = dropzone1Rect.width / 2;
            const dropzone1CenterY = dropzone1Rect.height / 2;
            appendElementToDropzone1(element.id, selectedDropzone1, dropzone1CenterX, dropzone1CenterY);
        } else {
            alert('Please select a dropzone1 first.');
        }
    });
});
function appendElementToDropzone1(id, dropzone1, x, y) {
    const element = document.getElementById(id);
    element.style.position = 'absolute';
    element.style.left = `${x - element.offsetWidth / 2}px`; // Center the element horizontally
    element.style.top = `${y - element.offsetHeight / 2}px`;  // Center the element vertically
    dropzone1.appendChild(element);
}
// Add click event listener to the draggable elements ends here....................
//three buttons (edit, delete and duplicate)
function addDeleteButton(element) {
    // Remove existing control buttons if any
    const existingControlButtons = element.querySelectorAll('.delete-button, .edit-button, .duplicate-button');
    existingControlButtons.forEach(button => button.remove());
    // Function to create a control button
    function createControlButton(icon, offset, className, onClick) {
        const button = document.createElement('div');
        button.innerHTML = icon; // SVG content
        button.className = className;
        button.style.position = 'absolute';
        button.style.top = '-25px'; // Adjust top position if needed
        button.style.right = `${offset}px`; // Adjust offset for each button
        button.style.cursor = 'pointer';
        button.style.color = '#333';
        button.style.fontSize = '14px';
        button.style.fontWeight = 'bold';
        button.style.zIndex = '1000000';
        button.style.backgroundColor = 'white';
        button.style.paddingTop = '3px';
        button.style.width = '25px';
        button.style.borderRadius = '3px';
        button.style.height = '20px';
        button.style.textAlign = 'center';
        button.style.lineHeight = '20px';
        button.style.visibility = 'hidden'; // Initially hide the buttons
        button.addEventListener('click', onClick);
        return button;
    }
    // Define button actions
    function handleDelete() {
        element.remove();
    }
  // Attach the edit button functionality
  function handleEdit() {
    element.contentEditable = 'true'; // Enable editing when edit is clicked
    element.focus(); // Focus the element to start editing
    // Disable editing when the element loses focus
    element.addEventListener('focusout', function() {
        element.contentEditable = 'false'; // Set back to false when done editing
    });
    const textArea = element.querySelector('textarea'); // Target the textarea inside the container
    if (textArea) {
        textArea.readOnly = false; // Enable editing
        textArea.focus(); // Focus the textarea to start editing
        // Set the textarea back to read-only when it loses focus
        textArea.addEventListener('focusout', function() {
            textArea.readOnly = true; // Disable editing once done
        });
    }
}
    function handleDuplicate() {
        const clone = element.cloneNode(true);
        element.parentNode.appendChild(clone);
        addMoveButton(clone);
        addDeleteButton(clone);
    }
    // Create and append edit, delete, and duplicate buttons with no space between them
    const editButton = createControlButton('<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>', 0, 'edit-button', handleEdit);
    const duplicateButton = createControlButton('<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#333"><path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z"/></svg>', 20, 'duplicate-button', handleDuplicate); // Adjusted offset
    const deleteButton = createControlButton('<svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>', 40, 'delete-button', handleDelete); // Adjusted offset
    // Append buttons to the element
    element.appendChild(editButton);
    element.appendChild(duplicateButton);
    element.appendChild(deleteButton);
    // Adjust positioning for specific element classes
    if (element.classList.contains('text-container') || element.classList.contains('text')) {
        const controlButtons = element.querySelectorAll('.delete-button, .edit-button, .duplicate-button');
        controlButtons.forEach((button, index) => {
            button.style.top = '0px';
            button.style.right = `${index * 20}px`; // Adjust positioning for each button
        });
    }
    if (element.classList.contains('resizeable-container') || element.classList.contains('container-element')) {
        element.style.position = 'absolute';
        const controlButtons = element.querySelectorAll('.delete-button, .edit-button, .duplicate-button');
        controlButtons.forEach((button, index) => {
            button.style.top = '0px';
            button.style.right = `${index * 20}px`; // Adjust positioning for each button
        });
    }
    // Add hover events to show/hide the control buttons
    element.addEventListener('mouseover', function () {
        const controlButtons = element.querySelectorAll('.delete-button, .edit-button, .duplicate-button');
        controlButtons.forEach(button => {
            button.style.visibility = 'visible';
        });
    });
    element.addEventListener('mouseout', function () {
        const controlButtons = element.querySelectorAll('.delete-button, .edit-button, .duplicate-button');
        controlButtons.forEach(button => {
            button.style.visibility = 'hidden';
        });
    });
}
//three buttons (edit, delete and duplicate) ends here................................
//move button
function addMoveButton(element) {
    // Remove existing move button if any
    const existingMoveButton = element.querySelector('.move-button');
    if (existingMoveButton) {
        existingMoveButton.remove();
    }
    // Create and style the move button
    const moveButton = document.createElement('div');
    moveButton.innerHTML = '&#10021;'; // Unicode for '✡'
    moveButton.className = 'move-button';
    moveButton.style.position = 'absolute';
    moveButton.style.top = '-10px';
    moveButton.style.left = '-5px';
    moveButton.style.cursor = 'move';
    moveButton.style.color = '#94ad84';
    moveButton.style.fontSize = '12px';
    moveButton.style.fontWeight = 'bold';
    moveButton.style.zIndex = '100';
    moveButton.style.backgroundColor = 'white';
    moveButton.style.borderRadius = '50%';
    moveButton.style.width = '20px';
    moveButton.style.height = '20px';
    moveButton.style.textAlign = 'center';
    moveButton.style.lineHeight = '20px';
    moveButton.contentEditable = false;
    moveButton.style.boxShadow = '0 0 3px rgba(0,0,0,0.3)';
    moveButton.style.opacity = '0'; // Initially hide the move button
    moveButton.style.transition = 'opacity 0.3s'; // Smooth transition for opacity
    // Add event listener for mouse dragging functionality
    moveButton.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent default action to avoid potential issues with text selection
        let isDragging = true;
        // Calculate offsets based on the element's current position
        let startX = e.clientX;
        let startY = e.clientY;
        let initialLeft = parseFloat(window.getComputedStyle(element).left) || 0;
        let initialTop = parseFloat(window.getComputedStyle(element).top) || 0;
        function onMouseMove(e) {
            if (isDragging) {
                const newLeft = initialLeft + (e.clientX - startX);
                const newTop = initialTop + (e.clientY - startY);
                element.style.left = `${newLeft}px`;
                element.style.top = `${newTop}px`;
            }
        }
        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    // Add event listener for touch dragging functionality
    moveButton.addEventListener('touchstart', function (e) {
        e.preventDefault(); // Prevent default action to avoid potential issues with touch scrolling
        let isDragging = true;
        const touch = e.touches[0];
        // Calculate offsets based on the element's current position
        let startX = touch.clientX;
        let startY = touch.clientY;
        let initialLeft = parseFloat(window.getComputedStyle(element).left) || 0;
        let initialTop = parseFloat(window.getComputedStyle(element).top) || 0;
        function onTouchMove(e) {
            if (isDragging) {
                const touch = e.touches[0];
                const newLeft = initialLeft + (touch.clientX - startX);
                const newTop = initialTop + (touch.clientY - startY);
                element.style.left = `${newLeft}px`;
                element.style.top = `${newTop}px`;
            }
        }
        function onTouchEnd() {
            isDragging = false;
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    });
    // Adjust button positioning based on element's class
    if (element.classList.contains('text-container')) {
        moveButton.style.top = '0px';
        moveButton.style.left = '0px';
    }
    if (element.classList.contains('text')) {
        moveButton.style.top = '0px';
        moveButton.style.left = '0px';
    }
    if (element.classList.contains('resizeable-container') || element.classList.contains('container-element')) {
        element.style.position = 'absolute';
        moveButton.style.top = '0px';
        moveButton.style.left = '0px';
    }
    element.appendChild(moveButton);
    // Show/hide the move button on hover
    element.addEventListener('mouseover', function () {
        moveButton.style.opacity = '1'; // Show button on hover
    });
    element.addEventListener('mouseout', function () {
        moveButton.style.opacity = '0'; // Hide button when not hovering
    });
}
//move button ends here...................................
//appending elements to UI page 
function appendElementToDropzone1(id, dropzone1, clientX, clientY) {
    let element;
    switch (id) {
       case 'H1':
    element = document.createElement('h4');
    // Initialize with &nbsp; Header for every new h1
    element.innerHTML = '&nbsp; Header';
    element.contentEditable = false;
    addDeleteButton(element);
    addMoveButton(element);
    // Apply the black border initially if only &nbsp; is present
    element.style.border = '1px solid black';
    // Function to ensure buttons are always present and functional
    function ensureButtons() {
        addDeleteButton(element);
        addMoveButton(element);
    }
    // Function to update the border based on the content
    function updateBorder(content) {
        if (content === '&nbsp; Header' || content.trim() === '&nbsp;') {
            element.style.border = '1px solid black';
        } else {
            element.style.border = 'none';
        }
    }
    // Add an event listener to handle when content is deleted or edited
    element.addEventListener('input', function () {
        let content = element.innerHTML;
        // Ensure only &nbsp; is preserved and is non-deletable
        if (!content.startsWith('&nbsp;')) {
            content = '&nbsp; ' + content; // Add &nbsp; at the beginning if missing
        }
        // Save content to localStorage
        localStorage.setItem('h1Content', content);
        // Update the element's content
        element.innerHTML = content;
        // Update border based on content
        updateBorder(content);
        // Maintain cursor position
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        // Ensure buttons are present and functional
        ensureButtons();
    });
    // Add a blur event listener to restore &nbsp; if content is empty on focus out
    element.addEventListener('blur', function () {
        let content = element.innerHTML;
        // If the content is empty or only whitespace, restore &nbsp;
        if (content.trim() === '' || content === '&nbsp;') {
            element.innerHTML = '&nbsp; Header';
            // Save this to localStorage as well
            localStorage.setItem('h1Content', element.innerHTML);
        }
        // Update border based on content
        updateBorder(element.innerHTML);
    });
    // Ensure the buttons are functional when loaded
    ensureButtons();
    break;
        case 'text':
            element = document.createElement('p');
            // Initialize with default content
            element.innerHTML = '&nbsp;text';
            element.contentEditable = false;
            element.style.border='1px solid #333';
            element.style.minWidth='130px';
            element.style.textAlign='left';
            addDeleteButton(element);
            addMoveButton(element);
            // Function to ensure buttons are always present and functional
            function ensureButtons() {
                addDeleteButton(element);
                addMoveButton(element);
            }
            // Add an event listener to handle when content is deleted or edited
            element.addEventListener('input', function () {
                let content = element.innerHTML;
                // Ensure only &nbsp; is preserved and is non-deletable
                if (!content.startsWith('&nbsp;')) {
                    content = '&nbsp; ' + content; // Add &nbsp; at the beginning if missing
                }
                // Save content to localStorage
                localStorage.setItem('paragraphContent', content);
                // Update the element's content
                element.innerHTML = content;
                // Maintain cursor position
                const range = document.createRange();
                range.selectNodeContents(element);
                range.collapse(false);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                // Ensure buttons are present and functional
                ensureButtons();
            });
            // Ensure the buttons are functional when loaded
           ensureButtons();
            break;
            case 'textarea':
                element = document.createElement('div');
                element.classList.add('text-container');
                element.style.overflow = 'hidden';
                element.style.width = '200px';
                element.style.height = '100px';
                element.style.resize = 'both';
                element.style.position = 'relative'; // Ensure proper positioning for buttons
                const textArea = document.createElement('textarea');
                textArea.style.minWidth = '100px';
                textArea.style.minHeight = '50px';
                textArea.style.width = '100%';
                textArea.style.height = '100%';
                textArea.style.resize = 'none';
                textArea.style.overflow = 'auto';
                element.appendChild(textArea);
                addMoveButton(element); // Add move button to the container
                // Initialize the textarea as read-only
                textArea.readOnly = true;
                addDeleteButton(element);
                break;
                case 'button':
                    element = document.createElement('button');
                    // Create a span element to hold the non-breaking space
                    const nonBreakingSpace = document.createElement('span');
                    nonBreakingSpace.innerHTML = '&nbsp;'; // Non-breaking space
                    nonBreakingSpace.style.display = 'inline-block'; // Ensure it takes up space
                    // Create a span element for the button text
                    const buttonText = document.createElement('span');
                    buttonText.textContent = 'Button'; // Text content of the button
                    buttonText.style.display = 'inline'; // Inline display for normal text
                    // Append both spans to the button element
                    element.appendChild(nonBreakingSpace);
                    element.appendChild(buttonText);
                    // Add padding and transition for visual feedback
                    element.style.padding = '10px 20px';
                    element.style.transition = 'background-color 0.2s'; // Smooth transition for visual feedback
                    // Set contentEditable to false for the entire button
                    element.contentEditable = 'false';
                    // Ensure the buttons are functional when loaded
                    addDeleteButton(element);
                    addMoveButton(element);
                    // Ensure the non-breaking space cannot be edited or deleted
                    nonBreakingSpace.contentEditable = 'false';
                    break;
            case 'select':
                element = document.createElement('div');
                element.classList.add('select-container');
                element.style.position = 'absolute';
                element.style.display = 'flex'; // Use flexbox to align items in a row
                element.style.alignItems = 'center'; // Align items vertically
                const selectElement = document.createElement('select');
                element.appendChild(selectElement);
                // Create a container for the input field and add button
                const inputContainer = document.createElement('div');
                inputContainer.classList.add('input-container');
                inputContainer.style.display = 'none'; // Hide initially
                inputContainer.style.marginLeft = '10px'; // Margin to separate from the select element
                element.appendChild(inputContainer);
                // Create the input field for adding new options
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.placeholder = 'Add here';
                inputElement.style.width = '80px'; // Adjust width as needed
                inputElement.style.marginRight = '5px';
                inputContainer.appendChild(inputElement);
                // Create the button to add new options
                const addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.style.width = '20px'; // Adjust width as needed
                addButton.style.height = '20px'; // Adjust height as needed
                inputContainer.appendChild(addButton);
                // Always-visible "+" button to toggle the input field
                const toggleButton = document.createElement('button');
                toggleButton.textContent = '+';
                toggleButton.style.width = '20px'; // Adjust width as needed
                toggleButton.style.height = '20px'; // Adjust height as needed
                toggleButton.style.marginLeft = '10px'; // Margin to separate from the select element
                element.appendChild(toggleButton);
                // Function to add a new option to the select element
                const addOption = (optionText) => {
                    const option = document.createElement('option');
                    option.textContent = optionText;
                    selectElement.appendChild(option);
                };
                // Event listener for the add button
                addButton.addEventListener('click', () => {
                    const newOptionValue = inputElement.value.trim();
                    if (newOptionValue !== '') {
                        addOption(newOptionValue);
                        inputElement.value = ''; // Clear the input field
                        inputContainer.style.display = 'none'; // Hide input field after adding
                        toggleButton.style.display = ''; // Ensure toggle button is visible again
                    }
                });
                // Event listener for the toggle button
                toggleButton.addEventListener('click', () => {
                    if (inputContainer.style.display === 'none') {
                        inputContainer.style.display = ''; // Show input field
                        toggleButton.style.display = 'none'; // Hide toggle button when input is visible
                    } else {
                        addButton.click(); // Simulate clicking the add button if input field is visible
                    }
                });
                addDeleteButton(element);
                element.style.left = `${clientX - dropzone1.getBoundingClientRect().left}px`;
                element.style.top = `${clientY - dropzone1.getBoundingClientRect().top}px`;
                addMoveButton(element);
                break;
        case 'image':
            element = createElement('image');
            // element.style.left = `${clientX - dropzone1.getBoundingClientRect().left}px`;
            //element.style.top = `${clientY - dropzone1.getBoundingClientRect().top}px`;
            element.style.position = 'absolute';
            element.style.width = '150px';
            element.style.height = '150px';
            element.classList.add('resizable');
            addDeleteButton(element);
            element.contentEditable = false;
            addMoveButton(element);
            break;
            case 'checkbox':
                // Create a container for the checkbox
                element = document.createElement('div');
                element.classList.add('element-wrapper'); // Add necessary class
                element.contentEditable = false; // Ensure the container is not editable
                // Add default content &nbsp;
                element.innerHTML = '&nbsp;'; // Set non-breaking space as default content
                // Create the checkbox input element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox'; // Define the checkbox type
                // Append the checkbox to the container
                element.appendChild(checkbox);
                // Add move button
                addMoveButton(element);
                // Add delete button
                addDeleteButton(element);
                break;
                case 'radio':
                    // Create a container for the radio button
                    element = document.createElement('div');
                    element.classList.add('element-wrapper'); // Add necessary class
                    element.contentEditable = false; // Ensure the container is not editable
                    // Add default content &nbsp;
                    element.innerHTML = '&nbsp;'; // Set non-breaking space as default content
                    // Create the radio input element
                    const radio = document.createElement('input');
                    radio.type = 'radio'; // Define the radio button type
                    // Append the radio button to the container
                    element.appendChild(radio);
                    // Add move button
                    addMoveButton(element);
                    addDeleteButton(element);
                    break;
            case 'label':
                element = document.createElement('label');
                // Initialize with default content
                element.innerHTML = '&nbsp;Label';
                element.contentEditable = true;
                addDeleteButton(element);
                addMoveButton(element);
                // Function to ensure buttons are always present and functional
                function ensureButtons() {
                    addDeleteButton(element);
                    addMoveButton(element);
                }
                // Add an event listener to handle when content is deleted or edited
                element.addEventListener('input', function () {
                    let content = element.innerHTML;
                    // Ensure only &nbsp; is preserved and is non-deletable
                    if (!content.startsWith('&nbsp;')) {
                        content = '&nbsp; ' + content; // Add &nbsp; at the beginning if missing
                    }
                    // Save content to localStorage
                    localStorage.setItem(`label-${labelCounter}`, content);
                    // Update the element's content
                    element.innerHTML = content;
                    // Maintain cursor position
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    range.collapse(false);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    // Ensure buttons are present and functional
                    ensureButtons();
                });
                // Ensure the buttons are functional when loaded
                ensureButtons();
                element.id = `label-${labelCounter}`;
                labelCounter++;
                element.addEventListener('mouseout', updateLabelTextInput); // Add event listener to update input field when mouse moves out of the label
                updateLabelDropdown();
                break;
                case 'paragraph':
    element = document.createElement('p');
    // Initialize with default content
    element.innerHTML = '&nbsp;Paragraph';
    element.contentEditable = true;
    addDeleteButton(element);
    addMoveButton(element);
    // Function to ensure buttons are always present and functional
    function ensureButtons() {
        addDeleteButton(element);
        addMoveButton(element);
    }
    // Add an event listener to handle when content is deleted or edited
    element.addEventListener('input', function () {
        let content = element.innerHTML;
        // Ensure only &nbsp; is preserved and is non-deletable
        if (!content.startsWith('&nbsp;')) {
            content = '&nbsp; ' + content; // Add &nbsp; at the beginning if missing
        }
        // Save content to localStorage
        localStorage.setItem('paragraphContent', content);
        // Update the element's content
        element.innerHTML = content;
        // Maintain cursor position
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        // Ensure buttons are present and functional
        ensureButtons();
    });
    // Ensure the buttons are functional when loaded
   ensureButtons();
    break;
    case 'date':
        // Create a container for the date input
        element = document.createElement('div');
        element.classList.add('element-wrapper'); // Add necessary class
        element.classList.add('date-time-input'); // Class for date/time inputs
        element.style.width = '110px';
        element.style.border = 'none'; // Remove border from container
        element.contentEditable = false; // Ensure the container is not editable
    
        // Create the date input element
        const dateInput = document.createElement('input');
        dateInput.type = 'date'; // Define the date input type
        dateInput.style.border = 'none'; // Remove border from input
        dateInput.style.width = '100%'; // Make input fill the container
    
        // Append the date input to the container
        element.appendChild(dateInput);
        // Add move button
        addMoveButton(element);
        addDeleteButton(element);
        break;
    
    case 'time':
        // Create a container for the time input
        element = document.createElement('div');
        element.classList.add('element-wrapper'); // Add necessary class
        element.classList.add('date-time-input'); // Class for date/time inputs
        element.style.width = '100px';
        element.style.border = 'none'; // Remove border from container
        element.contentEditable = false; // Ensure the container is not editable
    
        // Create the time input element
        const timeInput = document.createElement('input');
        timeInput.type = 'time'; // Define the time input type
        timeInput.style.border = 'none'; // Remove border from input
        timeInput.style.width = '100%'; // Make input fill the container
    
        // Append the time input to the container
        element.appendChild(timeInput);
        // Add move button
        addMoveButton(element);
        addDeleteButton(element);
        break;

        case 'images':
            // Create a container for the image
            element = document.createElement('div');
            element.classList.add('resizable'); // Add resizable class
            element.style.width = '150px'; // Initial width
            element.style.height = '150px'; // Initial height
            element.style.border = '1px solid #ccc'; // Border for the container
            element.style.background = '#f9f9f9'; // Background color
            element.style.position = 'relative'; // For resizing
        
            // Create an image element
            const image = document.createElement('img');
            image.style.width = '100%'; // Make image fill the container
            image.style.height = '100%'; // Make image fill the container
            image.style.display = 'block'; // Remove extra space below image
            
            // Create an input element for file selection
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*'; // Only allow image files
            fileInput.style.display = 'none'; // Hide the file input
            
            // Handle double-click to choose an image
            element.addEventListener('dblclick', function() {
                fileInput.click();
            });
            
            // Handle file selection
            fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        image.src = e.target.result; // Set image source to file content
                        if (!element.contains(image)) {
                            element.appendChild(image); // Append the image to the container
                        }
                    };
                    reader.readAsDataURL(file); // Read file as data URL
                }
            });
            
            // Create a resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.style.width = '10px';
            resizeHandle.style.height = '10px';
            resizeHandle.style.background = 'rgba(0, 0, 0, 0.5)';
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.right = '0';
            resizeHandle.style.bottom = '0';
            resizeHandle.style.cursor = 'nwse-resize';
            
            // Add resizing functionality
            let isResizing = false;
            let lastX, lastY;
            
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                lastX = e.clientX;
                lastY = e.clientY;
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            });
            
            function handleMouseMove(e) {
                if (!isResizing) return;
                const width = element.offsetWidth + (e.clientX - lastX);
                const height = element.offsetHeight + (e.clientY - lastY);
                element.style.width = `${width}px`;
                element.style.height = `${height}px`;
                lastX = e.clientX;
                lastY = e.clientY;
            }
            
            function handleMouseUp() {
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
            
            // Append resize handle to the container
            element.appendChild(resizeHandle);
            
            // Add the necessary buttons
            addMoveButton(element);
            addDeleteButton(element);
            
            // Ensure buttons are visible above the image
            element.style.zIndex = '10'; // Adjust z-index if necessary
            image.style.zIndex = '1'; // Ensure image is below the buttons
            
            break;
        

    
        // -----------------------------------------------------
     /*   case 'container':
            element = document.createElement('div');
            element.classList.add('container-element');
            element.style.position = 'absolute';
            element.style.minWidth = '100px';
            element.style.minHeight = '50px';
            element.style.width = '200px';
            element.style.height = '100px';
            element.style.border = '1px solid #ccc';
            element.style.backgroundColor = '#f9f9f9';
            element.style.padding = '5px';
            element.style.boxSizing = 'border-box';
            element.style.cursor = 'grab';
            element.style.margin = '8px';
            element.style.borderRadius = '5px';
            element.style.textAlign = 'center';
            element.style.fontSize = '1rem';
            element.draggable = true;
            element.contentEditable = true;
            const createEditableElement = (tag, text) => {
                const el = document.createElement(tag);
                el.contentEditable = true;
                el.textContent = text;
                return el;
            };  
            const header = createEditableElement('h3', 'Container Header');
            const paragraph = createEditableElement('p', 'This is a paragraph inside the container.');
            const button = document.createElement('button');
            button.textContent = 'Click Me';
            const contentArea = document.createElement('div');
            contentArea.classList.add('container-content');
            contentArea.appendChild(header);
            contentArea.appendChild(paragraph);
            contentArea.appendChild(button);
            element.appendChild(contentArea);
            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('container-resize-handle');
            resizeHandle.style.width = '10px';
            resizeHandle.style.height = '10px';
            resizeHandle.style.backgroundColor = '#000';
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.bottom = '0';
            resizeHandle.style.right = '0';
            resizeHandle.style.cursor = 'nwse-resize';
            element.appendChild(resizeHandle);
            // Add event listeners for resizing
            resizeHandle.addEventListener('mousedown', function (e) {
                e.preventDefault();
                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
            });
            function resize(e) {
                element.style.width = e.pageX - element.offsetLeft + 'px';
                element.style.height = e.pageY - element.offsetTop + 'px';
            }
            function stopResize() {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            }
            enableContainerResize(element);
            addDeleteButton(element);
            addMoveButton(element);
            break; */
    }
 //appending elements to UI page ends here...................................
  //not sure about which part
    // For image positioning
    const dropzone1Rect = dropzone1.getBoundingClientRect();
    const offsetX = clientX - dropzone1Rect.left;
    const offsetY = clientY - dropzone1Rect.top;
    if (id === 'image') {
        // Special positioning for image element
        element.style.position = 'absolute';
        element.style.left = `${offsetX - element.offsetWidth / 2}px`;
        element.style.top = `${offsetY - element.offsetHeight / 2}px`;
    } else {
        element.style.left = `${offsetX}px`;
        element.style.top = `${offsetY}px`;
    }
    if (id === 'image') {
        element.addEventListener('mousedown', function (event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                const initialX = event.clientX;
                const initialY = event.clientY;
                const startLeft = parseInt(element.style.left);
                const startTop = parseInt(element.style.top);
                function onMouseMove(event) {
                    const dx = event.clientX - initialX;
                    const dy = event.clientY - initialY;
                    element.style.left = `${startLeft + dx}px`;
                    element.style.top = `${startTop + dy}px`;
                }
                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });
        element.addEventListener('dblclick', function (event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                uploadImage(event.target);
            }
        });
        dropzone1.appendChild(element);
    } else {
        element.classList.add('dropped-element');
        element.style.margin = '0';
        element.draggable = true;
        const dropzone1Rect = dropzone1.getBoundingClientRect();
        const offsetX = clientX - dropzone1Rect.left;
        const offsetY = clientY - dropzone1Rect.top;
        element.style.left = `${offsetX}px`;
        element.style.top = `${offsetY}px`;
        element.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', '');
            element.style.opacity = '0.5';
        });
        element.addEventListener('dragend', function (event) {
            element.style.opacity = '1';
        });
        element.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        element.addEventListener('drop', function (event) {
            event.preventDefault();
            const offsetX = event.clientX - dropzone1Rect.left;
            const offsetY = event.clientY - dropzone1Rect.top;
            element.style.left = `${offsetX}px`;
            element.style.top = `${offsetY}px`;
        });
         //3.Removed double-click events for button, select and image ~sarang
        if (id !== 'button' && id !== 'select' && id !== 'image' && id !== 'text' && id !== 'textarea' && id !== 'radio' && id !== 'checkbox' && id !== 'label' && id !== 'container' && id !== 'button' && id !== 'H1' && id !== 'paragraph') {
            element.addEventListener('dblclick', function () {
                element.remove();
            });
        } else {
            // For button, select, and image, we need to adjust the draggable area
            const innerElement = element.firstChild;
            innerElement.addEventListener('mousedown', function (event) {
                const initialX = event.clientX;
                const initialY = event.clientY;
                const startX = parseInt(element.style.left);
                const startY = parseInt(element.style.top);
                function onMouseMove(event) {
                    const dx = event.clientX - initialX;
                    const dy = event.clientY - initialY;
                    element.style.left = `${startX + dx}px`;
                    element.style.top = `${startY + dy}px`;
                }
                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }
        dropzone1.appendChild(element);
        element.addEventListener('mousedown', function (event) {
            if (id === 'textarea' && id === 'text' && (event.offsetX > element.clientWidth - 20 || event.offsetY > element.clientHeight - 20)) {
                return; // Allow default resizing for textarea
            }
            const initialX = event.clientX;
            const initialY = event.clientY;
            const startX = parseInt(element.style.left);
            const startY = parseInt(element.style.top);
            function onMouseMove(event) {
                const dx = event.clientX - initialX;
                const dy = event.clientY - initialY;
                element.style.left = `${startX + dx}px`;
                element.style.top = `${startY + dy}px`;
            }
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
}
//till here 
//UI page resize
function enableResize(dropzone1) {
    const resizeHandle = dropzone1.querySelector('.resize-handle');
    resizeHandle.addEventListener('mousedown', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const initialHeight = dropzone1.offsetHeight;
        const initialY = event.clientY;
        function onMouseMove(event) {
            const height = initialHeight + (event.clientY - initialY);
            dropzone1.style.height = `${Math.max(50, height)}px`; // Set a minimum height of 50px
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}
//UI page resize ends here...............................
// Function to enable container resizing.
function enableContainerResize(container) {
    const resizeHandle = container.querySelector('.container-resize-handle');
    resizeHandle.addEventListener('mousedown', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = parseInt(container.style.width);
        const startHeight = parseInt(container.style.height);
        function onMouseMove(event) {
            const newWidth = Math.max(100, startWidth + event.clientX - startX);
            const newHeight = Math.max(50, startHeight + event.clientY - startY);
            container.style.width = `${newWidth}px`;
            container.style.height = `${newHeight}px`;
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}
// Function to enable container resizing. ends here.......................
//Initialize default dropzone1 (when multiple dropzone1s were there)
function initializeDefaultDropzone1() {
    const defaultDropzone1 = document.getElementById('dropzone1');
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    defaultDropzone1.appendChild(resizeHandle);
    enableResize(defaultDropzone1);
}
//Initialize default dropzone1 (when multiple dropzone1s were there) ends here..........................................
//share button handle function
function handleSharedDropzone1() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedDropzone1Id = urlParams.get('dropzone1');
    if (sharedDropzone1Id) {
        deserializeDropzone1(sharedDropzone1Id);
    }
}
// Call this function when the page loads
document.addEventListener('DOMContentLoaded', handleSharedDropzone1);
//share button handle function ends here...................
/*not sure...........................................................................................................*/
// Modified this function for image to add delete icon to it ~sarang
function createElement(type) {
    let element;
    switch (type) {
        case 'image':
            element = document.createElement('td');
            element.classList.add('resizeable-container');
            element.style.position = 'absolute';
            const img = document.createElement('img');
            img.src = 'https://via.placeholder.com/150';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            element.appendChild(img);
            addDeleteButton(element);
            addMoveButton(element);
            break;
    }
    return element;
}
function uploadImage(imgElement) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
    input.click();
}
//till here ......................
//custom elemets section: (styles button )
// References to custom elements
const fontSizeInput = document.getElementById('fontSizeInput');
const dropzone1BgColorInput = document.getElementById('dropzone1BgColorInput');
const fontColorInput = document.getElementById('fontColorInput');
const elementBgColorInput = document.getElementById('elementBgColorInput');
const elementBorderColorInput = document.getElementById('elementBorderColor');
const elementBorderRadiusInput = document.getElementById('elementBorderRadius');
const elementHeightInput = document.getElementById('elementHeight');
const elementWidthInput = document.getElementById('elementWidth');
const canvaBgInput = document.getElementById('canvaBg');
const applyButton = document.getElementById('applyButton');

// References to custom elements
const elementBgColorNone = document.getElementById('elementBgColorNone');
const fontColorNone = document.getElementById('fontColorNone');
const elementBorderColorNone = document.getElementById('elementBorderColorNone');

applyButton.addEventListener('click', function () {
    if (selectedDropzone1) {
        const fontSize = fontSizeInput.value;
        const dropzone1BgColor = dropzone1BgColorInput.value;
        const fontColor = fontColorNone.checked ? 'none' : fontColorInput.value;
        const elementBgColor = elementBgColorNone.checked ? 'none' : elementBgColorInput.value;
        const elementBorderColor = elementBorderColorNone.checked ? 'none' : elementBorderColorInput.value;
        const elementBorderRadius = elementBorderRadiusInput.value;
        const elementHeight = elementHeightInput.value;
        const elementWidth = elementWidthInput.value;

        // Apply dropzone1 styles
        if (dropzone1BgColor) {
            selectedDropzone1.style.backgroundColor = dropzone1BgColor;
        }

        // Apply the image from Canva Background Input
        const file = canvaBgInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                selectedDropzone1.style.backgroundImage = `url(${imageUrl})`;
                selectedDropzone1.style.backgroundSize = 'cover'; 
                selectedDropzone1.style.backgroundPosition = 'center'; 
            };
            reader.readAsDataURL(file);
        }

        // Apply selected element styles if an element is selected within the dropzone1
        const selectedElement = selectedDropzone1.querySelector('.dropped-element.selected');
        if (selectedElement) {
            if (fontSize) selectedElement.style.fontSize = `${fontSize}px`;
            if (fontColor !== 'none') selectedElement.style.color = fontColor; // Apply only if not none
            if (elementBgColor !== 'none') selectedElement.style.backgroundColor = elementBgColor; // Apply only if not none
            if (elementBorderColor !== 'none') {
                selectedElement.style.borderColor = elementBorderColor;
                selectedElement.style.borderStyle = 'solid';
            } else {
                selectedElement.style.border = 'none';
            }
            if (elementBorderRadius) selectedElement.style.borderRadius = `${elementBorderRadius}px`;
            if (elementHeight) selectedElement.style.height = `${elementHeight}px`;
            if (elementWidth) selectedElement.style.width = `${elementWidth}px`;
        }
    }
});

// Event listener for selecting elements within the dropzone1
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('dropped-element')) {
        const previouslySelected = document.querySelector('.dropped-element.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        event.target.classList.add('selected');
    }
});
// Function to update the label dropdown list
function updateLabelDropdown() {
    const labelDropdown = document.getElementById('labelDropdown');
    labelDropdown.innerHTML = ''; // Clear the current list
    const labels = document.querySelectorAll('.dropzone1 label');
    labels.forEach(label => {
        const option = document.createElement('option');
        option.value = label.id;
        // Remove ❌ and ✥ symbols from the label's text
        const labelText = label.textContent.replace(/[❌✥]/g, '').trim();
        option.textContent = labelText;
        labelDropdown.appendChild(option);
    });
}
// Event listener for the label dropdown
document.getElementById('labelInput').addEventListener('input', function () {
    const selectedLabelId = document.getElementById('labelDropdown').value;
    const selectedLabel = document.getElementById(selectedLabelId);
    if (selectedLabel) {
        // Remove ❌ and ✥ symbols from the input value
        const inputValue = this.value.replace(/[❌✥]/g, '').trim();
        selectedLabel.textContent = inputValue;
        updateLabelDropdown(); // Update the dropdown list to reflect the changed text
    }
});
// Function to update the label text when the input field is modified
document.getElementById('labelInput').addEventListener('input', function () {
    const selectedLabelId = document.getElementById('labelDropdown').value;
    const selectedLabel = document.getElementById(selectedLabelId);
    if (selectedLabel) {
        selectedLabel.textContent = this.value;
        updateLabelDropdown(); // Update the dropdown list to reflect the changed text
    }
});
// Function to update the input field when the label text is changed
function updateLabelTextInput(event) {
    const labelInput = document.getElementById('labelInput');
    // Remove ❌ and ✥ symbols from the label's text content
    const labelText = event.target.textContent.replace(/[❌✥]/g, '').trim();
    labelInput.value = labelText;
    updateLabelDropdown(); // Update the dropdown list to reflect the changed text
}
// Shyam Part
// JavaScript to toggle the visibility of the form
document.getElementById('toggleButton').addEventListener('click', function () {
    const formContainer = document.getElementById('formContainer');
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
});
//custom elemets section: (styles button ) ends here............................................
//navbar buttons
const symbolButtons = document.querySelectorAll('.symbol-btn');
const contentContainers = document.querySelectorAll('.content');
symbolButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content');
        contentContainers.forEach(container => {
            container.style.display = (container.id === `content${contentId}`) ? 'block' : 'none';
        });
    });
});
//navbar buttons ends here..............................
//download btn code...........
function downloadTableImage() {
    const dropzone1 = document.querySelector('.dropzone1');
    if (!dropzone1) {
        console.error('Dropzone1 not found.');
        return;
    }

    html2canvas(dropzone1).then(canvas => {
        // Create a new canvas for resizing
        const mobileCanvas = document.createElement('canvas');
        const mobileCtx = mobileCanvas.getContext('2d');
        
        // Set the mobile canvas size (example size for mobile view)
        const mobileWidth = 375; // Width for mobile view
        const mobileHeight = (canvas.height * mobileWidth) / canvas.width; // Maintain aspect ratio
        mobileCanvas.width = mobileWidth;
        mobileCanvas.height = mobileHeight;
        
        // Draw the image from the original canvas to the new mobile canvas
        mobileCtx.drawImage(canvas, 0, 0, mobileWidth, mobileHeight);

        // Load and draw the logo
        const logo = new Image();
        logo.src = 'RDF_UI/logo.jpg'; // Path to your logo image
        logo.style.borderRadius='15px';

        // Ensure logo is loaded before drawing
        logo.onload = () => {
            // Set logo dimensions and position (adjust as needed)
            const logoWidth = 50; // Width of the logo
            const logoHeight = 50; // Height of the logo
            const logoX = mobileWidth - logoWidth - 15; // X position (10px from the right)
            const logoY = mobileHeight - logoHeight - 15; // Y position (10px from the bottom)

            // Draw the logo onto the mobile canvas
            mobileCtx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);


   

            // Get the resized image data
            const imgData = mobileCanvas.toDataURL('image/png');
            // Create a download link
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'dropzone1-image.png';
            // Append the link, trigger click, and remove the link
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    }).catch(error => {
        console.error('Error generating image:', error);
    });
}

//download btn code ends here...........
/* not sure......................................*/
//reattached............. 
function reattachEventListeners(element) {
    element.addEventListener('mousedown', function (event) {
        const initialX = event.clientX;
        const initialY = event.clientY;
        const startX = parseInt(element.style.left) || 0;
        const startY = parseInt(element.style.top) || 0;
        function onMouseMove(event) {
            const dx = event.clientX - initialX;
            const dy = event.clientY - initialY;
            element.style.left = `${startX + dx}px`;
            element.style.top = `${startY + dy}px`;
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    // Add delete button
    addDeleteButton(element);
    addMoveButton(element);
    // Reattach image upload functionality for image elements
    if (element.classList.contains('resizeable-container')) {
        const img = element.querySelector('img');
        if (img) {
            img.addEventListener('dblclick', function (event) {
                uploadImage(event.target);
            });
            img.addEventListener('mousedown', function (event) {
                if (event.target.tagName.toLowerCase() === 'img') {
                    const initialX = event.clientX;
                    const initialY = event.clientY;
                    const startLeft = parseInt(element.style.left);
                    const startTop = parseInt(element.style.top);
                    const startWidth = parseInt(element.style.width);
                    const startHeight = parseInt(element.style.height);
                    function onMouseMove(event) {
                        const dx = event.clientX - initialX;
                        const dy = event.clientY - initialY;
                        const dw = event.clientX - initialX;
                        const dh = event.clientY - initialY;
                        element.style.left = `${startLeft + dx}px`;
                        element.style.top = `${startTop + dy}px`;
                        element.style.width = `${startWidth + dw}px`;
                        element.style.height = `${startHeight + dh}px`;
                    }
                    function onMouseUp() {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    }
                    addDeleteButton(element);
                    addMoveButton(element);
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });
        }
    }
}
//reattached ends here...............................................
//for save button
document.addEventListener('DOMContentLoaded', () => {
    restoreDropZone1();
    document.querySelector('.save-btn').addEventListener('click', freezeDropZone1);
    document.querySelector('.edit-btn').addEventListener('click', unfreezeDropZone1);
    document.querySelector('.share-btn').addEventListener('click', shareDropZone1);
    // Attach the delete function to the delete button
    document.querySelector('.delete-btn').addEventListener('click', clearDropzone1AndStorage);
});
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}
function freezeDropZone1() {
    const dropzone1 = document.querySelector('.dropzone1');
    const elementsToSave = Array.from(dropzone1.children).map(element => ({
        id: element.id || generateUniqueId(),
        innerHTML: element.innerHTML,
        classList: Array.from(element.classList),
        style: element.getAttribute('style')
    }));
    localStorage.setItem('dropzone1BgColor', dropzone1.style.backgroundColor);
    localStorage.setItem('dropzone1BgImage', dropzone1.style.backgroundImage); // Save background image URL
    localStorage.setItem('dropzone1Contents', JSON.stringify(elementsToSave));
    Array.from(dropzone1.children).forEach(element => {
        if (!element.classList.contains('save-btn') &&
            !element.classList.contains('edit-btn') &&
            !element.classList.contains('download-btn') &&
            !element.classList.contains('share-btn')) {
            element.removeAttribute('draggable');
            element.setAttribute('contenteditable', false);
            element.classList.add('frozen');
        }
    });
    console.log('Drop zone saved and frozen, excluding specific buttons.');
}

//after save reattache them...
function addEventListenersToElement(element) {
    if (element.tagName.toLowerCase() === 'button' || element.classList.contains('resizable-container')) {
        addDeleteButton(element);
        addMoveButton(element);
    }
    // Reapply event listeners specific to each element type
    if (element.tagName.toLowerCase() === 'div' && element.classList.contains('text-container')) {
        addMoveButton(element);
        addDeleteButton(element);
    } else if (element.tagName.toLowerCase() === 'textarea') {
        addMoveButton(element);
        addDeleteButton(element);
    } else if (element.tagName.toLowerCase() === 'select') {
        addDeleteButton(element);
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'image') {
        addDeleteButton(element);
        addMoveButton(element);
    }else if (element.tagName.toLowerCase() === 'text') {
        addMoveButton(element);
        addDeleteButton(element);
    } else if (element.tagName.toLowerCase() === 'H1') {
        addDeleteButton(element);
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'label') {
        addDeleteButton(element);
        addMoveButton(element);
    }else if (element.tagName.toLowerCase() === 'button') {
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'select') {
        addDeleteButton(element);
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'checkbox') {
        addDeleteButton(element);
        addMoveButton(element);
    }else if (element.tagName.toLowerCase() === 'radio') {
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'paragraph') {
        addDeleteButton(element);
        addMoveButton(element);
    } else if (element.tagName.toLowerCase() === 'container') {
        addDeleteButton(element);
        addMoveButton(element);
    }
    // Apply functionality for draggable and content-editable elements
    if (element.getAttribute('draggable') === 'true') {
        addMoveButton(element);
        addDeleteButton(element);
    }
    // Ensure all elements have proper event listeners for resizing if needed
    if (element.classList.contains('resizable')) {
        addResizeListeners(element);
    }
}
//for save button ends here..........................
//edit button
function restoreDropZone1() {
    const dropzone1 = document.querySelector('.dropzone1');
    const savedElements = JSON.parse(localStorage.getItem('dropzone1Contents'));
    const savedBgColor = localStorage.getItem('dropzone1BgColor');
    const savedBgImage = localStorage.getItem('dropzone1BgImage'); // Get background image URL
    if (savedBgColor) {
        dropzone1.style.backgroundColor = savedBgColor;
    }
    if (savedBgImage) {
        dropzone1.style.backgroundImage = savedBgImage; // Apply background image URL
        dropzone1.style.backgroundSize = 'cover'; 
        dropzone1.style.backgroundPosition = 'center'; 
    }
    if (savedElements) {
        dropzone1.innerHTML = ''; // Clear existing content
        savedElements.forEach(elementData => {
            const element = document.createElement('div');
            element.id = elementData.id;
            element.innerHTML = elementData.innerHTML;
            element.classList.add(...elementData.classList);
            element.setAttribute('style', elementData.style || '');
            dropzone1.appendChild(element);
            // Reattach event listeners
            if (typeof addEventListenersToElement === 'function') {
                addEventListenersToElement(element);
            } else {
                console.warn('addEventListenersToElement function is not defined.');
            }
            if (!element.classList.contains('save-btn') &&
                !element.classList.contains('edit-btn') &&
                !element.classList.contains('download-btn') &&
                !element.classList.contains('share-btn')) {
                // Restore element state
                element.removeAttribute('draggable');
                element.setAttribute('contenteditable', false);
                element.classList.add('frozen');
                // Ensure move button is added
                if (typeof addMoveButton === 'function') {
                    addMoveButton(element);
                } else {
                    console.warn('addMoveButton function is not defined.');
                }
            }
        });
        console.log('Drop zone restored with functionality.');
    } else {
        console.log('No saved elements found in localStorage.');
    }
}


function unfreezeDropZone1() {
    const dropzone1 = document.querySelector('.dropzone1');
    Array.from(dropzone1.children).forEach(element => {
        if (!element.classList.contains('save-btn') &&
            !element.classList.contains('edit-btn') &&
            !element.classList.contains('download-btn') &&
            !element.classList.contains('share-btn')) {
            element.setAttribute('draggable', true);
            element.setAttribute('contenteditable', true);
            element.classList.remove('frozen');
            // Re-add move button
            addMoveButton(element);
            addDeleteButton(element);
        }
    });
    console.log('Drop zone unfrozen.');
}
//edit button ends here..........................
// delete dropzone1
function clearDropzone1AndStorage() {
    const dropzone1 = document.querySelector('.dropzone1');
    if (dropzone1) {
        // Clear the contents of the dropzone1
        dropzone1.innerHTML = '';
        // Clear localStorage
        localStorage.removeItem('dropzone1BgColor');
        localStorage.removeItem('dropzone1Contents');
        localStorage.removeItem('dropzone1BgImage');
        console.log('Dropzone1 cleared and storage reset.');
    } else {
        console.log('Dropzone1 element not found.');
    }
}
// delete dropzone1 ends here.................................

//share button
function shareDropZone1() {
    const dropzone1Content = localStorage.getItem('dropzone1Contents');
    if (!dropzone1Content) {
        console.error('Nothing to share. Save the drop zone first.');
        return;
    }
    const dropzone1Id = 'unique-dropzone1-id';
    localStorage.setItem(dropzone1Id, dropzone1Content);
    const shareableLink = `${window.location.origin}${window.location.pathname}?dropzone1=${dropzone1Id}`;
    console.log('Shareable link:', shareableLink);
    alert(`Shareable link: ${shareableLink}`);
}
function serializeDropzone1(dropzone1) {
    const content = {
        style: dropzone1.getAttribute('style'),
        className: dropzone1.className,
        elements: []
    };
    dropzone1.querySelectorAll('.dropped-element').forEach(element => {
        let elementData = {
            type: element.tagName.toLowerCase(),
            style: element.getAttribute('style'),
            className: element.className,
            left: element.style.left,
            top: element.style.top
        };
        if (element.tagName.toLowerCase() === 'label') {
            elementData.id = element.id;
            elementData.textContent = element.textContent;
        } else {
            elementData.innerHTML = element.innerHTML;
        }
        content.elements.push(elementData);
    });
    return content;
}
function createShareModal(shareableLink) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <span class="close">&times;</span>
            <h2>Share Your Dropzone1</h2>
            <button id="shareWhatsApp">Share on WhatsApp</button>
            <button id="shareFacebook">Share on Facebook</button>
            <button id="shareTwitter">Share on Twitter</button>
            <button id="shareLinkedIn">Share on LinkedIn</button>
            <button id="shareEmail">Share via Email</button>
            <div class="copy-link-container">
                <input type="text" id="shareLinkInput" value="${shareableLink}" readonly>
                <button id="copyLink">Copy Link</button>
            </div>
        </div>
    `;
    return modal;
}
function setupShareOptions(modal, shareUrl, shareText) {
    const whatsappBtn = modal.querySelector('#shareWhatsApp');
    const facebookBtn = modal.querySelector('#shareFacebook');
    const twitterBtn = modal.querySelector('#shareTwitter');
    const linkedInBtn = modal.querySelector('#shareLinkedIn');
    const emailBtn = modal.querySelector('#shareEmail');
    const copyLinkBtn = modal.querySelector('#copyLink');
    const shareLinkInput = modal.querySelector('#shareLinkInput');
    whatsappBtn.onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    facebookBtn.onclick = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    twitterBtn.onclick = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    linkedInBtn.onclick = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`, '_blank');
    emailBtn.onclick = () => window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
    copyLinkBtn.onclick = () => {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    };
}
function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
function generateUniqueId() {
    return 'dropzone1_' + Math.random().toString(36).substr(2, 9);
}
function reattachEventListeners(element) {
    element.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', '');
        element.style.opacity = '0.5';
    });
    element.addEventListener('dragend', function (event) {
        element.style.opacity = '1';
    });
    element.addEventListener('mousedown', function (event) {
        const initialX = event.clientX;
        const initialY = event.clientY;
        const startX = parseInt(element.style.left);
        const startY = parseInt(element.style.top);
        function onMouseMove(event) {
            const dx = event.clientX - initialX;
            const dy = event.clientY - initialY;
            element.style.left = `${startX + dx}px`;
            element.style.top = `${startY + dy}px`;
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}
//share button ends here.................................................
// ---------------------------working chalu aahe nu aditya\---------------------------------------------------------------------
//button cursor at end..............................
function setCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Move the cursor to the end
    selection.removeAllRanges();
    selection.addRange(range);
}
     // Toggle button functionality...................(not using for now) 
     document.addEventListener('DOMContentLoaded', function() {
        const draggables = document.querySelectorAll('.draggable');
        const dropzone1s = document.querySelectorAll('.dropzone1');
        let selectedDropzone1 = null;
        let draggedElement = null;
        let isTouchDevice = false;
        const elementNameDisplay = document.getElementById('element-name-display');
        draggables.forEach(draggable => {
            // Handle both mouse and touch events
            const addDragClass = () => {
                draggable.classList.add('selected-draggable');
            };
            const removeDragClass = () => {
                draggable.classList.remove('selected-draggable');
            };
            // Function to display the element's title in the element-name-display box
            const displayElementName = () => {
                const elementTitle = draggable.getAttribute('data-title');
                if (elementTitle) {
                    elementNameDisplay.textContent = elementTitle;
                    elementNameDisplay.style.display = 'block'; // Make sure the display box is visible
                } else {
                    
                    elementNameDisplay.style.display = 'none'; // Hide if no title
                }
            };
            // Function to clear the element-name-display box
            const clearElementName = () => {
                
                elementNameDisplay.style.display = 'none'; // Hide the display box when not dragging
            };
            // Mouse events
            draggable.addEventListener('mousedown', function (event) {
                draggedElement = draggable;
                addDragClass();
                displayElementName();
                isTouchDevice = false;
            });
            draggable.addEventListener('mouseup', function () {
                removeDragClass();
                clearElementName();
            });
            // Touch events
            draggable.addEventListener('touchstart', function (event) {
                draggedElement = draggable;
                addDragClass();
                displayElementName();
                isTouchDevice = true;
                event.preventDefault(); // Prevent default behavior like scrolling
            }, { passive: false });
            draggable.addEventListener('touchend', function () {
                removeDragClass();
                clearElementName();
            });
            // Drag start event (for mouse and touch)
            draggable.addEventListener('dragstart', function (event) {
                if (!isTouchDevice) {
                    // Set the dragged element's ID in the dataTransfer object for mouse events
                    event.dataTransfer.setData('elementId', draggable.id);
                }
                displayElementName(); // Display the name when dragging starts
                // Hide toolboxContainer when dragging starts
                const toolboxContainer = document.getElementById('toolboxContainer');
                toolboxContainer.style.transform = 'translateX(100%)';
                toolboxContainer.style.opacity = '0';
            });
            // Drag end event
            draggable.addEventListener('dragend', function () {
                removeDragClass();
                clearElementName(); // Clear the display box when dragging ends
                draggedElement = null; // Clear the reference to the dragged element
            });
        });
             // Toggle button functionality...................(not using for now) ends here.................
        // Toggle button functionality
        document.getElementById('hamburgerButton').onclick = function() {
            const toolboxContainer = document.getElementById('toolboxContainer');
            if (toolboxContainer.style.transform === 'translateX(0%)') {
                toolboxContainer.style.transform = 'translateX(100%)';
                toolboxContainer.style.opacity = '0';
            } else {
                toolboxContainer.style.transform = 'translateX(0%)';
                toolboxContainer.style.opacity = '1';
            }
        };
        // Droppable areas (for mouse)
        dropzone1s.forEach(dropzone1 => {
            dropzone1.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
            dropzone1.addEventListener('drop', function (event) {
                event.preventDefault();
                const elementId = event.dataTransfer.getData('elementId');
                const originalElement = document.getElementById(elementId);
                if (elementId && event.target.classList.contains('dropzone1')) {
                    const elementTitle = originalElement.getAttribute('data-title');
                    // If elementTitle exists and is not empty, create a new element
                    if (elementTitle) {
                        const newElement = document.createElement('div');
                        newElement.classList.add('dropped-element');
                        // Optionally, add some functionality-specific properties or behavior to the new element
                        // but do not show any unnecessary text
                        newElement.textContent = ''; // You can leave this empty or add other properties
                        // Append the new element to the dropzone1
                        event.target.appendChild(newElement);
                    }z
                }
                const toolboxContainer = document.getElementById('toolboxContainer');
                toolboxContainer.style.transform = 'translateX(100%)';
                toolboxContainer.style.opacity = '0';
                clearElementName(); // Clear the display box after the drop
            });
            dropzone1.addEventListener('click', function () {
                if (selectedDropzone1) {
                    selectedDropzone1.classList.remove('selected-dropzone1');
                }
                selectedDropzone1 = dropzone1;
                dropzone1.classList.add('selected-dropzone1');
            });
        });
    });
    //....................audio......................
    document.addEventListener('DOMContentLoaded', function () {
        const dropSound = document.getElementById('dropSound'); // Reference to the sound element
        
        
        toolboxElements.forEach(element => {
            element.addEventListener('click', function () {
                dropSound.play().catch(error => console.error('Error playing sound:', error));
            });
    
            // Optionally, you can also add a touch event for mobile devices
            element.addEventListener('touchstart', function () {
                dropSound.play().catch(error => console.error('Error playing sound:', error));
            });
    
            // Start playing sound on dragstart or touchstart
            element.addEventListener('dragstart', function () {
                dropSound.play().catch(error => console.error('Error playing sound:', error));
            });
    
            element.addEventListener('touchstart', function () {
                dropSound.play().catch(error => console.error('Error playing sound:', error));
            });
    
            // Stop sound on dragend or touchend
            element.addEventListener('dragend', function () {
                dropSound.pause();
                dropSound.currentTime = 0; // Reset sound to the beginning
            });
    
            element.addEventListener('touchend', function () {
                dropSound.pause();
                dropSound.currentTime = 0; // Reset sound to the beginning
            });
        });
    
        // Existing dropzone1 drop event logic
        const dropzone1 = document.querySelector('.dropzone1'); // Adjust selector as needed
        dropzone1.addEventListener('drop', function (event) {
            event.preventDefault();
            const id = event.dataTransfer.getData('text');
            if (id && event.target.classList.contains('dropzone1')) {
                const elements = document.getElementById(id);
                dropSound.play();
                event.dataTransfer.clearData();
            }
            var toolboxContainer = document.getElementById('toolboxContainer');
            toolboxContainer.style.transform = 'translateX(100%)';
            toolboxContainer.style.opacity = '0';
        });
    });
    
    // Function to play the dropSound
    function playDropSound() {
        const dropSound = document.getElementById('dropSound');
        if (dropSound) {
            dropSound.play();
        }
    }
    
    // Attach the playDropSound function to the click or touch event of the buttons
    document.getElementById('customContainer').addEventListener('click', playDropSound);
    document.getElementById('hamburgerButton').addEventListener('click', playDropSound);
    
    // Optional: If you want the sound to play on touch events as well (for mobile devices)
    document.getElementById('customContainer').addEventListener('touchstart', playDropSound);
    document.getElementById('hamburgerButton').addEventListener('touchstart', playDropSound);
    
//............................end button sound......................

//delete button .......................
function clearDropzone1Contents() {
    document.getElementById('dropzone1Contents').innerHTML = '';
}
//sounds for elements......................
  // Select all div elements with class 'draggable'
  document.querySelectorAll('.draggable').forEach(function(div) {
    // Attach a click event listener to each div
    div.addEventListener('click', function() {
        // Construct the ID for the corresponding audio element
        var soundId = 'sound-' + this.id;
        
        // Retrieve the audio element by its ID
        var sound = document.getElementById(soundId);
        
        // Check if the audio element exists and play the sound
        if (sound) {
            sound.play();
        }
    });
});