// parameters for elements (dropzone, elements)
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
let selectedDropzone = null;
let dropzoneCount = 1; // Start with 1 because we have a default dropzone
const MAX_DROPZONES = 3;
let labelCounter = 0;

// Inject the CSS class into the document
const style = document.createElement('style');
style.innerHTML = `
body {
    background: #10131a;
}
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
            #dropzone, .dropzone { 
                position: relative; 
                overflow: hidden; 
                resize: vertical; 
            }
            .dropzone {
                position: relative;
                border-radius:20px;
                border:5px solid #333; /* Ensure buttons are positioned relative to the dropzone */
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
            .dropzone::-webkit-resizer {
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
            .selected-dropzone { background-color: #f0f0f0; }
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
                .resizable {
    position: relative;
    overflow: hidden;
  }

  .resize-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #333;
    opacity: 0.5;
    cursor: pointer;
  }

  .resize-handle.se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }

  .resize-handle.ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
  }

  .resize-handle.sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
  }

  .resize-handle.nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
  }
    `;
    document.head.appendChild(style);

    // dropzones 
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        
        dropzone.addEventListener('drop', function (event) {
            event.preventDefault();
            const id = event.dataTransfer.getData('text');
            if (id && event.target.classList.contains('dropzone')) {
                const element = document.getElementById(id);
                appendElementToDropzone(element.id, dropzone, event.offsetX, event.offsetY); // Use drop position
            }
        });
    });
    
    // Add click event listener to the draggable elements
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(element => {
        element.addEventListener('click', function () {
            // Find the first dropzone available and append the element
            const availableDropzone = [...dropzones].find(zone => zone.classList.contains('dropzone'));
            if (availableDropzone) {
                const dropzoneRect = availableDropzone.getBoundingClientRect();
                const dropzoneCenterX = dropzoneRect.width / 2;
                const dropzoneCenterY = dropzoneRect.height / 2;
                appendElementToDropzone(element.id, availableDropzone, dropzoneCenterX, dropzoneCenterY);
            }
        });
    });
    
    function appendElementToDropzone(id, dropzone, x, y) {
        const element = document.getElementById(id);
        element.style.position = 'absolute';
        element.style.left = `${x - element.offsetWidth / 2}px`; // Center the element horizontally
        element.style.top = `${y - element.offsetHeight / 2}px`;  // Center the element vertically
        dropzone.appendChild(element);
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
    moveButton.style.bottom = '-25px';
    moveButton.style.left = '50%'; // Center horizontally
    moveButton.style.transform = 'translateX(-50%)'; // Adjust position to truly center
    moveButton.style.cursor = 'move';
    moveButton.style.color = '#333'; // Text color
    moveButton.style.fontSize = '12px';
    moveButton.style.fontWeight = 'bold';
    moveButton.style.zIndex = '100';
    moveButton.style.backgroundColor = 'transparent'; // Transparent background
    moveButton.style.borderRadius = '3px';
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
        moveButton.style.bottom = '10px';
        moveButton.style.left = '10px';
    }
    if (element.classList.contains('text')) {
        moveButton.style.bottom = '10px';
        moveButton.style.left = '10px';
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

    // Function to move the cursor to the end of the content
    function moveCursorToEnd(el) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false); // Collapse the range to the end of the content
        selection.removeAllRanges(); // Clear any existing selections
        selection.addRange(range); // Add the new range
        el.focus(); // Focus the element
    }

    // Add double-click functionality for text, buttons, and paragraphs to make them editable,
    // but skip it for checkboxes, radios, and images.
    if (!['checkbox', 'radio', 'image'].includes(element.id)) {
        element.addEventListener('dblclick', function () {
            element.contentEditable = true; // Enable editing for allowed elements
            moveCursorToEnd(element); // Move cursor to end
        });
    }

    // Add double-tap functionality for text areas
    if (element.tagName === 'TEXTAREA') {
        element.addEventListener('touchend', function (e) {
            if (e.detail === 2) { // Check if it's a double-tap
                element.readOnly = false; // Enable editing
                element.focus(); // Focus the textarea to start editing

                // Set the textarea back to read-only when it loses focus
                element.addEventListener('focusout', function () {
                    element.readOnly = true; // Disable editing once done
                });
            }
        });
    }

    // Disable editing when user clicks outside the element
    document.addEventListener('click', function (e) {
        if (!element.contains(e.target)) {
            element.contentEditable = false; // Disable editing if click outside
        }
    });

    // Disable editing when user touches outside the element (for mobile)
    document.addEventListener('touchstart', function (e) {
        if (!element.contains(e.target)) {
            element.contentEditable = false; // Disable editing if touch outside
        }
    });
}

//move button ends here...................................
//appending elements to UI page 
function appendElementToDropzone(id, dropzone, clientX, clientY) {
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
                    // Create a container for the editable area
                    element = document.createElement('div');
                    element.classList.add('text-container');
                    element.style.overflow = 'hidden';
                    element.style.width = '150px';
                    element.style.height = '80px';

                    // Create the textarea and set it to read-only
                    const textArea = document.createElement('textarea');
                    textArea.style.minWidth = '100px';
                    textArea.style.minHeight = '50px';
                    textArea.style.width = '80%';
                    textArea.style.height = '60%';
                    textArea.style.resize = 'none';
                    textArea.style.overflow = 'auto';
                    textArea.readOnly = true; // Textarea stays read-only

                    // Append the textarea to the container
                    element.appendChild(textArea);

                    addMoveButton(element); // Add move button to the container

                    // Center the move button and position it towards the bottom
                    const moveButton = element.querySelector('.move-button');
                    moveButton.style.position = 'absolute';
                    moveButton.style.left = '50%';
                    moveButton.style.bottom = '5px';
                    moveButton.style.transform = 'translateX(-50%)';

                    // When the textarea's container is double-clicked, set the container to be editable
                    element.addEventListener('dblclick', function() {
                        textArea.readOnly = false; // Enable textarea editing
                        textArea.focus(); // Focus the textarea for editing
                        const range = textArea.value.length; // Move the cursor to the end
                        textArea.setSelectionRange(range, range);

                        // Disable textarea editing when it loses focus
                        textArea.addEventListener('focusout', function() {
                            textArea.readOnly = true; // Set it back to read-only
                        });
                    });

                    addDeleteButton(element); // Add delete button
                    break;
                    case 'button':
    element = document.createElement('button');
    
    // Create a span element for the button text
    const buttonText = document.createElement('span');
    buttonText.textContent = 'Button'; // Text content of the button
    buttonText.style.display = 'inline'; // Inline display for normal text
    
    // Disable interaction with the button text, but not the button itself
    buttonText.style.pointerEvents = 'none'; 
    
    // Append the span to the button element
    element.appendChild(buttonText);

    // Style the button to make it responsive and center the text
    element.style.display = 'flex'; // Use Flexbox for centering
    element.style.justifyContent = 'center'; // Horizontally center the text
    element.style.alignItems = 'center'; // Vertically center the text
    element.style.padding = '10px'; // Optional padding for extra space

    // Ensure the button text remains centered when the button's size changes
    element.style.width = 'auto'; // Width can be adjusted by the user
    element.style.height = 'auto'; // Height can be adjusted by the user

    // Set contentEditable to false for the entire button
    element.contentEditable = 'false';

    // Now add the delete and move buttons
    addDeleteButton(element); // Delete button should still work
    addMoveButton(element); // Move button should still work

    // Ensure the event listeners work even after editing the text
    element.addEventListener('click', function(e) {
        // Prevent interaction with the span text
        if (e.target.tagName === 'SPAN') {
            e.stopPropagation();
        }
    });

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
                element.style.left = `${clientX - dropzone.getBoundingClientRect().left}px`;
                element.style.top = `${clientY - dropzone.getBoundingClientRect().top}px`;
                addMoveButton(element);
                break;
                case 'image':
                    // Create the image element
                    element = document.createElement('div');
                
                    // Set the initial image placeholder (50px x 50px with a default image icon)
                    element.innerHTML = '<img src="RDF_UI/RDF_MEDIA/imgplaceholder.png" alt="Image" style="width:100%; height:100%;">';
                    
                    // Make sure it's not editable
                    element.contentEditable = false;
                
                    // Add tabindex so that the div can receive focus
                    element.tabIndex = 0;
                
                    // Add the resizable functionality by adding 4 corner handles
                    element.style.position = 'relative';
                    element.style.display = 'inline-block';
                    element.style.border = '1px solid black';  // Placeholder for the image
                    element.style.width = '50px';  // Set the initial size
                    element.style.height = '50px';
                
                    // Function to show handles and border
                    function showHandles() {
                        element.style.border = '1px solid black'; // Show border
                        resizeHandles.forEach(handle => {
                            const handleElement = element.querySelector(`.${handle}-handle`);
                            handleElement.style.display = 'block';  // Show handle
                        });
                    }
                
                    // Function to hide handles and border
                    function hideHandles() {
                        element.style.border = 'none'; // Hide border
                        resizeHandles.forEach(handle => {
                            const handleElement = element.querySelector(`.${handle}-handle`);
                            handleElement.style.display = 'none';  // Hide handle
                        });
                    }
                
                    // Create resize handles
                    const resizeHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
                    resizeHandles.forEach(handle => {
                        const divHandle = document.createElement('div');
                        
                        // Add class names
                        divHandle.className = handle + '-handle resize-handle';
                        
                        // Set position and appearance
                        divHandle.style.position = 'absolute';
                        divHandle.style.background = 'rgba(0, 0, 0, 0.8)'; // Semi-transparent black
                        divHandle.style.border = '2px solid #fff'; // White border for contrast
                        divHandle.style.borderRadius = '50%'; // Make handles circular
                        divHandle.style.width = '12px'; // Slightly larger for better usability
                        divHandle.style.height = '12px'; // Slightly larger for better usability
                        divHandle.style.cursor = handle.includes('top') ? 'ns-resize' : 'ew-resize'; // More specific cursor styles
                        divHandle.style.zIndex = '1000'; // Ensure it appears on top
                        divHandle.style.display = 'none'; // Initially hide handles
                        
                        // Add hover effect
                        divHandle.style.transition = 'background 0.2s ease';
                        divHandle.onmouseover = () => {
                            divHandle.style.background = 'rgba(255, 255, 255, 0.6)'; // Change color on hover
                        };
                        divHandle.onmouseout = () => {
                            divHandle.style.background = 'rgba(0, 0, 0, 0.8)'; // Revert to original color
                        };
                
                        // Position the handles based on their type
                        switch (handle) {
                            case 'top-left':
                                divHandle.style.left = '84%';
                                divHandle.style.top = '-7px';
                                break;
                            case 'top-right':
                                divHandle.style.right = '-4px';
                                divHandle.style.top = '-7px';
                                break;
                            case 'bottom-left':
                                divHandle.style.left = '84%';
                                divHandle.style.bottom = '-7px';
                                break;
                            case 'bottom-right':
                                divHandle.style.right = '-4px';
                                divHandle.style.bottom = '-4px';
                                break;
                        }
                
                        // Append handle to the element
                        element.appendChild(divHandle);
                    });
                
                    // Show handles and border on focus
                    element.addEventListener('focus', showHandles);
                
                    // Hide handles and border on blur (when the element loses focus)
                    element.addEventListener('blur', hideHandles);
                
                    // Initially hide handles and border (call once to ensure starting state)
                    hideHandles();
                
                    // Add double-click event to open the file explorer
                    element.addEventListener('dblclick', function () {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = 'image/*'; // Only allow image files
                        
                        fileInput.addEventListener('change', function () {
                            const file = fileInput.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = function (e) {
                                    // Replace placeholder with the selected image
                                    const img = element.querySelector('img');
                                    img.src = e.target.result;
                                    img.style.width = '100%'; // Set the image to fill the div
                                    img.style.height = '100%';
                                    img.style.border = 'none';  // Remove border once image is loaded
                                };
                                reader.readAsDataURL(file);  // Read the image file
                            }
                        });
                        
                        // Trigger the file input click
                        fileInput.click();
                    });
                
                    // Add the resizable functionality using mouse and touch events
                    let resizing = false;
                    let startX, startY, startWidth, startHeight;
                
                    function startResize(e) {
                        if (e.target.classList.contains('resize-handle')) {
                            resizing = true;
                            startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                            startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
                            startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
                            startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
                            e.preventDefault();  // Prevent default drag behavior
                        }
                    }
                
                    function resize(e) {
                        if (resizing) {
                            const dx = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - startX;
                            const dy = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - startY;
                            element.style.width = startWidth + dx + 'px';
                            element.style.height = startHeight + dy + 'px';
                        }
                    }
                
                    function stopResize() {
                        if (resizing) {
                            resizing = false;
                        }
                    }
                
                    // Mouse events
                    element.addEventListener('mousedown', startResize);
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('mouseup', stopResize);
                
                    // Touch events
                    element.addEventListener('touchstart', startResize);
                    document.addEventListener('touchmove', resize);
                    document.addEventListener('touchend', stopResize);
                
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
   

        case 'images':
            // Create a container for the image
            element = document.createElement('div');
            element.classList.add('resizable'); // Add resizable class
            element.style.width = '50px'; // Initial width
            element.style.height = '50px'; // Initial height
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
    }
 //appending elements to UI page ends here...................................
  //not sure about which part
    // For image positioning
    const dropzoneRect = dropzone.getBoundingClientRect();
    const offsetX = clientX - dropzoneRect.left;
    const offsetY = clientY - dropzoneRect.top;
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
        dropzone.appendChild(element);
    } else {
        element.classList.add('dropped-element');
        element.style.margin = '0';
        element.draggable = true;
        const dropzoneRect = dropzone.getBoundingClientRect();
        const offsetX = clientX - dropzoneRect.left;
        const offsetY = clientY - dropzoneRect.top;
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
            const offsetX = event.clientX - dropzoneRect.left;
            const offsetY = event.clientY - dropzoneRect.top;
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
        dropzone.appendChild(element);
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
function enableResize(dropzone) {
    const resizeHandle = dropzone.querySelector('.resize-handle');
    resizeHandle.addEventListener('mousedown', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const initialHeight = dropzone.offsetHeight;
        const initialY = event.clientY;
        function onMouseMove(event) {
            const height = initialHeight + (event.clientY - initialY);
            dropzone.style.height = `${Math.max(50, height)}px`; // Set a minimum height of 50px
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
//Initialize default dropzone (when multiple dropzones were there)
function initializeDefaultDropzone() {
    const defaultDropzone = document.getElementById('dropzone');
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    defaultDropzone.appendChild(resizeHandle);
    enableResize(defaultDropzone);
}
//Initialize default dropzone (when multiple dropzones were there) ends here..........................................
//share button handle function
function handleSharedDropzone() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedDropzoneId = urlParams.get('dropzone');
    if (sharedDropzoneId) {
        deserializeDropzone(sharedDropzoneId);
    }
}
// Call this function when the page loads
document.addEventListener('DOMContentLoaded', handleSharedDropzone);

// Custom elements section: (styles button)
// Get references to all input elements
const fontSizeInput = document.getElementById('fontSizeInput');
const dropzoneBgColorInput = document.getElementById('dropzoneBgColorInput');
const fontColorInput = document.getElementById('fontColorInput');
const elementBgColorInput = document.getElementById('elementBgColorInput');
const elementBorderColorInput = document.getElementById('elementBorderColor');
const elementBorderRadiusInput = document.getElementById('elementBorderRadius');
const elementHeightInput = document.getElementById('elementHeight');
const elementWidthInput = document.getElementById('elementWidth');
const canvaBgInput = document.getElementById('canvaBg');

// References to "None" checkboxes
const elementBgColorNone = document.getElementById('elementBgColorNone');
const fontColorNone = document.getElementById('fontColorNone');
const elementBorderColorNone = document.getElementById('elementBorderColorNone');

// Utility function to get the selected element
function getSelectedElement() {
    const dropzone = document.getElementById('dropzone'); // Ensure you have a dropzone with this ID
    if (dropzone) {
        return dropzone.querySelector('.dropped-element.selected');
    }
    return null;
}

// Function to apply background color to dropzone
dropzoneBgColorInput.addEventListener('input', function () {
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
        dropzone.style.backgroundColor = this.value;
    }
});

// Function to handle Canva Background Image
canvaBgInput.addEventListener('change', function () {
    const dropzone = document.getElementById('dropzone');
    if (dropzone && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            dropzone.style.backgroundImage = `url(${imageUrl})`;
            dropzone.style.backgroundSize = 'cover';
            dropzone.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Function to apply font size
fontSizeInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        selectedElement.style.fontSize = `${this.value}px`;
    }
});

// Function to apply font color
fontColorInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement && !fontColorNone.checked) {
        selectedElement.style.color = this.value;
    }
});

// Handle font color "None" checkbox
fontColorNone.addEventListener('change', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        if (this.checked) {
            selectedElement.style.color = '';
        } else {
            selectedElement.style.color = fontColorInput.value;
        }
    }
});

// Function to apply background color
elementBgColorInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement && !elementBgColorNone.checked) {
        selectedElement.style.backgroundColor = this.value;
    }
});

// Handle background color "None" checkbox
elementBgColorNone.addEventListener('change', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        if (this.checked) {
            selectedElement.style.backgroundColor = '';
        } else {
            selectedElement.style.backgroundColor = elementBgColorInput.value;
        }
    }
});

// Function to apply border color
elementBorderColorInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement && !elementBorderColorNone.checked) {
        selectedElement.style.borderColor = this.value;
    }
});

// Handle border color "None" checkbox
elementBorderColorNone.addEventListener('change', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        if (this.checked) {
            selectedElement.style.border = 'none';
        } else {
            selectedElement.style.borderColor = elementBorderColorInput.value;
        }
    }
});

// Function to apply border radius
elementBorderRadiusInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        selectedElement.style.borderRadius = `${this.value}px`;
    }
});

// Function to apply element height
elementHeightInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        selectedElement.style.height = `${this.value}px`;
    }
});

// Function to apply element width
elementWidthInput.addEventListener('input', function () {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
        selectedElement.style.width = `${this.value}px`;
    }
});

// Event listener for selecting elements within the dropzone
document.addEventListener('click', function (event) {
    const dropzone = document.getElementById('dropzone');
    
    // Check if the click was inside the dropzone
    if (dropzone.contains(event.target)) {
        if (event.target.classList.contains('dropped-element')) {
            const previouslySelected = document.querySelector('.dropped-element.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
            event.target.classList.add('selected');
        }
    }
    // If clicked outside dropzone, do nothing (don't remove the selection)
});

// Optional: Toggle the form container visibility when the Style button is clicked
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
    const dropzone = document.querySelector('.dropzone');
    if (!dropzone) {
        console.error('Dropzone not found.');
        return;
    }

    html2canvas(dropzone).then(canvas => {
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
        logo.src = 'RDF_UI/UI_DownloadImg.png'; // Path to your logo image
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
            link.download = 'dropzone-image.png';
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
    restoreDropZone();
    document.querySelector('.save-btn').addEventListener('click', freezeDropZone);
    document.querySelector('.edit-btn').addEventListener('click', unfreezeDropZone);
    document.querySelector('.share-btn').addEventListener('click', shareDropZone);
    // Attach the delete function to the delete button
    document.querySelector('.delete-btn').addEventListener('click', clearDropzoneAndStorage);
});
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}
function freezeDropZone() {
    const dropzone = document.querySelector('.dropzone');
    const elementsToSave = Array.from(dropzone.children).map(element => ({
        id: element.id || generateUniqueId(),
        innerHTML: element.innerHTML,
        classList: Array.from(element.classList),
        style: element.getAttribute('style')
    }));
    localStorage.setItem('dropzoneBgColor', dropzone.style.backgroundColor);
    localStorage.setItem('dropzoneBgImage', dropzone.style.backgroundImage); // Save background image URL
    localStorage.setItem('dropzoneContents', JSON.stringify(elementsToSave));
    Array.from(dropzone.children).forEach(element => {
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
function restoreDropZone() {
    const dropzone = document.querySelector('.dropzone');
    const savedElements = JSON.parse(localStorage.getItem('dropzoneContents'));
    const savedBgColor = localStorage.getItem('dropzoneBgColor');
    const savedBgImage = localStorage.getItem('dropzoneBgImage'); // Get background image URL
    if (savedBgColor) {
        dropzone.style.backgroundColor = savedBgColor;
    }
    if (savedBgImage) {
        dropzone.style.backgroundImage = savedBgImage; // Apply background image URL
        dropzone.style.backgroundSize = 'cover'; 
        dropzone.style.backgroundPosition = 'center'; 
    }
    if (savedElements) {
        dropzone.innerHTML = ''; // Clear existing content
        savedElements.forEach(elementData => {
            const element = document.createElement('div');
            element.id = elementData.id;
            element.innerHTML = elementData.innerHTML;
            element.classList.add(...elementData.classList);
            element.setAttribute('style', elementData.style || '');
            dropzone.appendChild(element);
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


function unfreezeDropZone() {
    const dropzone = document.querySelector('.dropzone');
    Array.from(dropzone.children).forEach(element => {
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
// delete dropzone
function clearDropzoneAndStorage() {
    const dropzone = document.querySelector('.dropzone');
    if (dropzone) {
        // Clear the contents of the dropzone
        dropzone.innerHTML = '';
        // Clear localStorage
        localStorage.removeItem('dropzoneBgColor');
        localStorage.removeItem('dropzoneContents');
        localStorage.removeItem('dropzoneBgImage');
        console.log('Dropzone cleared and storage reset.');
    } else {
        console.log('Dropzone element not found.');
    }
}
// delete dropzone ends here.................................

//share button
function shareDropZone() {
    const dropzoneContent = localStorage.getItem('dropzoneContents');
    if (!dropzoneContent) {
        console.error('Nothing to share. Save the drop zone first.');
        return;
    }
    const dropzoneId = 'unique-dropzone-id';
    localStorage.setItem(dropzoneId, dropzoneContent);
    const shareableLink = `${window.location.origin}${window.location.pathname}?dropzone=${dropzoneId}`;
    console.log('Shareable link:', shareableLink);
    alert(`Shareable link: ${shareableLink}`);
}
function serializeDropzone(dropzone) {
    const content = {
        style: dropzone.getAttribute('style'),
        className: dropzone.className,
        elements: []
    };
    dropzone.querySelectorAll('.dropped-element').forEach(element => {
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
            <h2>Share Your Dropzone</h2>
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
    return 'dropzone_' + Math.random().toString(36).substr(2, 9);
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
        const dropzones = document.querySelectorAll('.dropzone');
        let selectedDropzone = null;
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
        dropzones.forEach(dropzone => {
            dropzone.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
            dropzone.addEventListener('drop', function (event) {
                event.preventDefault();
                const elementId = event.dataTransfer.getData('elementId');
                const originalElement = document.getElementById(elementId);
                if (elementId && event.target.classList.contains('dropzone')) {
                    const elementTitle = originalElement.getAttribute('data-title');
                    // If elementTitle exists and is not empty, create a new element
                    if (elementTitle) {
                        const newElement = document.createElement('div');
                        newElement.classList.add('dropped-element');
                        // Optionally, add some functionality-specific properties or behavior to the new element
                        // but do not show any unnecessary text
                        newElement.textContent = ''; // You can leave this empty or add other properties
                        // Append the new element to the dropzone
                        event.target.appendChild(newElement);
                    }z
                }
                const toolboxContainer = document.getElementById('toolboxContainer');
                toolboxContainer.style.transform = 'translateX(100%)';
                toolboxContainer.style.opacity = '0';
                clearElementName(); // Clear the display box after the drop
            });
            dropzone.addEventListener('click', function () {
                if (selectedDropzone) {
                    selectedDropzone.classList.remove('selected-dropzone');
                }
                selectedDropzone = dropzone;
                dropzone.classList.add('selected-dropzone');
            });
        });
    });

//delete button .......................
function clearDropzoneContents() {
    document.getElementById('dropzoneContents').innerHTML = '';
}


//Undo & Redu Button Functionality Start

