

<h2 style="font-family: 'Arial', sans-serif;font-size: 3rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.1) 
    font-family: 'Arial', sans-serif; margin-top:-20px; padding:-10px 0px;
    background: linear-gradient(135deg, blue, pink, black, red); /* Multicolor gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display:flex; 
    justify-content:center;">Created UIs</h2>

<table class="section" style="width: 100%; margin-top: 10px;">
<!-- UI Page 1 Button -->
<tr id="row-1" style="justify-content: center; margin-right:10px;">
    <td style="text-align: center; width: 100%;">
        <a href="RDFView.php?ui=dragAndDrop1UI">
            <button id="btn-1" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 1
            </button>
        </a>
    </td>
    <td style=" text-align: left;">
 
        <button onclick="editName(1)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(1)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

<!-- UI Page 2 Button -->
<tr id="row-2" style="display: none; justify-content: center;">
    <td style="text-align: center; width: 80%;">
    <a href="RDFView.php?ui=dragAndDrop2UI">
            <button id="btn-2" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 2
            </button>
        </a>
    </td>
    <td style="width: 20%; text-align: left;">
        <button onclick="editName(2)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(2)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

<!-- UI Page 3 Button -->
<tr id="row-3" style="display: none; justify-content: center;">
    <td style="text-align: center; width: 80%;">
        <a href="RDFView.php?ui=dragAndDrop3UI">
            <button id="btn-3" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 3
            </button>
        </a>
    </td>
    <td style="width: 20%; text-align: left;">
        <button onclick="editName(3)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(3)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

<!-- UI Page 4 Button -->
<tr id="row-4" style="display: none; justify-content: center;">
    <td style="text-align: center; width: 80%;">
    <a href="RDFView.php?ui=dragAndDrop4UI">
            <button id="btn-4" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 4
            </button>
        </a>
    </td>
    <td style="width: 20%; text-align: left;">
        <button onclick="editName(4)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(4)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

<!-- UI Page 5 Button -->
<tr id="row-5" style="display: none; justify-content: center;">
    <td style="text-align: center; width: 80%;">
    <a href="RDFView.php?ui=dragAndDrop5UI">
            <button id="btn-5" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 5
            </button>
        </a>
    </td>
    <td style="width: 20%; text-align: left;">
        <button onclick="editName(5)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(5)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

<!-- UI Page 6 Button -->
<tr id="row-6" style="display: none; justify-content: center;">
    <td style="text-align: center; width: 80%;">
    <a href="RDFView.php?ui=dragAndDrop6UI">
            <button id="btn-6" style="   color: blue; 
                  width:100%;
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  font-size: 16px; 
                  cursor: pointer; ">
                UI Page 6
            </button>
        </a>
    </td>
    <td style="width: 20%; text-align: left;">
        <button onclick="editName(6)" style="   background: none; 
              border: none; 

             
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="18x" viewBox="0 -960 960 960" width="18px" fill="#333"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
    </button>
        <button onclick="deleteRow(6)" style="  background: none; 
              color: #fff; 
              border: none; 
      
        
              cursor: pointer; 
              transition: background-color 0.3s, transform 0.3s; 
              ">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
        </button>
    </td>
</tr>

        <!-- Add (+) Button -->
        <tr id="add-btn-row">
        <td style="text-align: center;">
            <button id="add-btn" onclick="showNext()" style=" margin-top:-70px;
                background-color: #4CAF50; 
                border: none; 
                border-radius: 50%; 
                width: 50px; 
                height: 50px; 
                font-size: 24px; 
                color: #fff; 
                cursor: pointer; 
                box-shadow: 0px 4px 6px rgba(0,0,0,0.1); 
                transition: background-color 0.3s, box-shadow 0.3s;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.1) 
    font-family: 'Arial', sans-serif; margin-top:-20px; padding:-10px 0px;
    background: linear-gradient(135deg, blue, pink, black, red); /* Multicolor gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">+</button>
        </td>
    </tr>
</table>

<script>
    let currentRow = 1;

    
function deleteRow(rowId) {
    // Hide the row
    document.getElementById('row-' + rowId).style.display = 'none';

    // Clear associated local storage
    localStorage.removeItem('btnName-' + rowId);

    // Reset the UI Page  button text
    let btn = document.getElementById('btn-' + rowId);
    btn.textContent = 'UI Page ' + rowId;

    // Enable the (+) button if it's hidden
    document.getElementById('add-btn-row').style.display = 'table-row';
}

function showNext() {
    if (currentRow < 6) {
        currentRow++;
        var nextRow = document.getElementById('row-' + currentRow);
        if (nextRow) {
            nextRow.style.display = 'table-row';
        }
    }
}

function editName(btnId) {
    let btn = document.getElementById('btn-' + btnId);
    let currentName = btn.textContent.trim();
    let newName = prompt("Enter new name:", currentName);
    if (newName) {
        btn.textContent = newName;
        localStorage.setItem('btnName-' + btnId, newName);
    }
}

// Load saved names from localStorage on page load
window.onload = function() {
    for (let i = 1; i <= 6; i++) {
        let savedName = localStorage.getItem('btnName-' + i);
        if (savedName) {
            document.getElementById('btn-' + i).textContent = savedName;
        }
    }
};
</script>