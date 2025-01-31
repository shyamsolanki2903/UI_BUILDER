
<!-- Navbar area --> 
<div class="section" style=" display:flex; flex-direction:row;justify-content:space-evenly; margin-top:-20px;background : #10131a;margin-left: 20px;">
    <div class="section" id="user" style="display: flex; flex-direction: row; align-items: center;">
        <img src="RDF_UI/RDF_MEDIA/logo.png" alt="Profile Image" style="height: 40px; width: 40px; border-radius: 50%;margin-top: -5px;margin-left : -20px;">
        <?php
            session_start();
            // Check if the session is active and full name is set
            if (isset($_SESSION['fullName'])) {
                echo '<span style="margin-left: 10px; margin-top: -5px; color: #ffffff; margin-right: 20px;">' . $_SESSION['fullName'] . '</span>'; // Add margin-right for spacing
            } else {
                echo '<span style="color: #ffffff; margin-top: -5px; margin-right: 20px;">Guest</span>'; // Add margin-right for spacing
            }
        ?>
    </div>
    <div style="display:flex; flex-direction:row; justify-content:end; margin-right: 20px; background: #10131a;">
        <button class="btn" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;" onclick="downloadTableImage()" download-btn>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
            </svg>
        </button>
        <button class="btn save-btn" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5">
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
            </svg>
        </button>
        <button class="btn edit-btn" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
            </svg>
        </button>
        <button id="clearButton" class="btn" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;" onclick="clearDropzoneAndStorage()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
        <button class="btn" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;">
            <a href="RDFView.php?ui=dashBoardUI" style="display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" fill="#f5f5f5">
                    <path d="M520-400h80v-120h120v-80H600v-120h-80v120H400v80h120v120ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
                </svg>
            </a>
        </button>
        <button onclick="toggleButtons()" style="background:#34353e; border:none; border-radius:10px; height:30px; width:30px; margin-top:10px; margin-left:5px; display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill="#f5f5f5">
                <path d="M3 3h18v2H3V3zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="#f5f5f5"/>
            </svg>
        </button>
    </div>
</div>

<!-- Navbar complete -->
<!-- UI Page -->
<div id="toggle-buttons" style="display: none; margin-top: 0px; text-align: right;">
    <button onclick="toggleBlueGrid()" style="padding: 5px; background-color: #333; color: white; border: none; border-radius: 5px; margin-bottom: 5px; height: 25px; width: 25px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 3px;">
            <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
        </svg>
    </button>
    
    <button onclick="toggleGrid()" style="padding: 5px; background-color: #333; color: white; border: none; border-radius: 5px; margin-bottom: 5px; height: 25px; width: 25px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 3px;">
            <path d="M3 3h18v2H3V3zm0 7h18v2H3v-2zm0 7h18v2H3v-2zM3 3h18v4H3V3zm0 8h18v4H3v-4zm0 8h18v4H3v-4z" />
        </svg>
    </button>

    <button onclick="toggleRowGrid()" style="padding: 5px; background-color: #333; color: white; border: none; border-radius: 5px; height: 25px; width: 25px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 3px;">
            <path d="M3 3h5v18H3V3zm8 0h5v18h-5V3zm8 0h5v18h-5V3z" />
        </svg>
    </button>
</div>
<center style="background: #10131a">
    <table class="section" style="align-items: center;width: 303.2px;position: relative;height: 500.2px; margin-top: 0px;background: #10131a">
        <tr>
            <td style="border: 5px solid #333; border-radius: 12px; background: #f5f5f5; margin: 10px 5px; text-align: center; font-size: 1rem; max-height: auto; display: flex; margin-left: 23px; flex-direction: column; min-height: 500px; width: 230px; align-items: center; position: relative;" id="dropzone" class="dropzone">          
                <!-- Red stripe pattern SVG -->
                <svg id="grid-svg" width="100%" height="100%" viewBox="0 0 230 500" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; display: none; border-radius: 8px;">
                    <defs>
                        <pattern id="redStripes" width="40" height="500" patternUnits="userSpaceOnUse">
                            <rect width="32" height="500" fill="rgba(255, 0, 0, 0.2)" />
                            <rect x="37" width="18" height="500" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#redStripes)" />
                </svg>

                <!-- Blue grid pattern SVG -->
                <svg id="small-grid-svg" width="100%" height="100%" viewBox="0 0 230 500" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; display: none; border-radius: 8px;">
                    <defs>
                        <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255, 0, 0, 0.3)" stroke-width="0.5" />
                        </pattern>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <rect width="80" height="80" fill="url(#smallGrid)" />
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 0, 0, 0.5)" stroke-width="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                <!-- Row pattern SVG -->
                <svg id="row-grid-svg" width="100%" height="100%" viewBox="0 0 230 500" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; display: none; border-radius: 8px;">
                    <defs>
                        <pattern id="rowPattern" width="500" height="80" patternUnits="userSpaceOnUse"> 
                            <rect height="74" width="500" fill="rgba(0, 0, 255, 0.2)" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#rowPattern)" />
                </svg>
            </td>
        </tr>
    </table>
</center>

<script>
     function toggleButtons() {
        var toggleButtonsDiv = document.getElementById("toggle-buttons");
        toggleButtonsDiv.style.display = toggleButtonsDiv.style.display === "none" ? "block" : "none";
    }

    function toggleGrid() {
        var grid = document.getElementById("grid-svg");
        grid.style.display = grid.style.display === "none" ? "block" : "none";
    }

    function toggleBlueGrid() {
        var blueGrid = document.getElementById("small-grid-svg");
        blueGrid.style.display = blueGrid.style.display === "none" ? "block" : "none";
    }

    function toggleRowGrid() {
        var rowGrid = document.getElementById("row-grid-svg");
        rowGrid.style.display = rowGrid.style.display === "none" ? "block" : "none";
    }
</script>

<!-- UI page complete-->
 <!-- Style button -->   
 <!-- Style button -->   
<table class="section">
    <div id="customContainer" class="custom" style="position: fixed; bottom: 50px; z-index: 1000;   transition: transform 0.5s ease-out, opacity 0.5s ease-out;">
    <button id="toggleButton" class="style-btn" style="
    padding: 10px 30px; 
    color: white; 
    border: none; 
    border-radius: 10px; 
    font-size: 1rem; 
    cursor: pointer; 
    position: fixed; 
    bottom: 0px; 
    left: 20px; 
    z-index: 1;
    background: #33343c;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    transform: translateY( -22px);">
    <b>Style</b>
</button>
    <!-- Form Table -->
    <div id="formContainer" style="display: none; position: absolute; bottom: 35px;  left: 100%; margin-left: -10px; padding:10px 10px 10px 20px;   transition: transform 0.5s ease-out, opacity 0.5s ease-out;background: #33343c;border-radius:7px;">
    <div class="symbol-container" style="display: flex; flex-direction: column; flex-wrap: nowrap;  margin-left: -10px;  transition: transform 0.5s ease-out, opacity 0.5s ease-out; width: 92px;">
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="1" style="width: 100%; border-radius:7px; padding:5px 0px; font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">BG Color</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="2" style="padding:5px 8px; width: 100%;  border-radius:7px;font-size:0.78rem;background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Font Color</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="3" style="width: 100%; border-radius:7px; padding:5px 0px;font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Border Color</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="4" style="padding:5px 4px; width: 100%;  border-radius:7px; font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Canva Color</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="5" style="padding:5px 9px; width: 100%;  border-radius:7px; font-size:0.78rem;background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Height</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="6" style="padding:5px 6px; width: 100%;  border-radius:7px;font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Width</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="10" style="padding:2.5px 7.5px; width: 100%;  border-radius:7px; font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Radius</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="8" style="padding:5px 4px; width: 100%;  border-radius:7px; font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Font size</button>
    </div>
    <div class="symbol-btn-container" style=" position: relative; margin: 3px 0; width: 100%;">
        <button class="symbol-btn" data-content="11" style="padding:5px 4px; width: 100%;  border-radius:7px;font-size:0.78rem; background : #7f8388;
  background-size: 100% 100%;
  background-position: center;
  background-blend-mode: multiply; border:none; color:#fff; ">Image</button>
    </div> 

</div>
</div>
<div class="content-container"  style="  position:absolute; bottom: -7px; left:-11px; width:20px;">
    <div id="content1" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap ; color: #fff" >
        Fore Color <input type="color" value="#ffffff" id="elementBgColorInput" style="font-size: 0.5rem;">
        <input type="checkbox" id="elementBgColorNone"> None
    </div>
    <div id="content2" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Font Color <input type="color" id="fontColorInput" value="#000000" style="font-size: 6px;">
        <input type="checkbox" id="fontColorNone"> None
    </div>
    <div id="content3" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Border Color <input type="color" id="elementBorderColor" value="#000000">
        <input type="checkbox" id="elementBorderColorNone"> None
    </div>
    <div id="content4" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Canva Color <input type="color" id="dropzoneBgColorInput" value="#ffffff">
    </div>
    <div id="content5" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
    Element Height: 
    <input type="number" 
           id="elementHeight" 
           min="5" 
           max="250" 
           value="28" 
           name="slider" 
           style="font-size: 14px; width: 60px; height:20px; border-radius:3px;" 
           oninput="adjustHeight(this)">
    </div>

    <div id="content6" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
    Element Width: 
    <input type="number" 
           id="elementWidth" 
           min="5" 
           max="500" 
           value="100" 
           name="slider" 
           style="font-size: 14px; width: 60px; height: 20px; border-radius: 3px;" 
           oninput="updateElementWidth(this)">
    </div>

    <div id="content7" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Label: <select id="labelDropdown" style="font-size: 12px;"></select>
    </div>
    <div id="content8" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Font Size (px): <input type="number" id="fontSizeInput" value="16" min="8" max="26" style="font-size: 14px; width: 60px; height:20px; border-radius:3px;">
    </div>
    <div id="content9" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap;">
        Label Text: <input type="text" id="labelInput" style="font-size: 8px;">
    </div>
    <div id="content10" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
        Border Radius (px): <input type="number" id="elementBorderRadius" style="font-size: 14px; width: 40px; height:20px; border-radius:3px; value:0">
    </div>
    <div id="content11" class="content" style="display: none; font-size: 0.8rem; white-space: nowrap; color: #fff">
    Canva Bg: <input type="file" id="canvaBg" accept="image/*" style="font-size: 8px; width:130px;">
</div>
</div>
<!--
        <table style="width: 300px; display : none">
            <tr>
                <td colspan="4" style="text-align: center;">
                    <button id="applyButton" style="padding: 6px 8px; background-color: #b0cbf7; border: none; border-radius: 5px; font-size: 0.5rem;">Apply</button>
                </td>
            </tr>
        </table>
        -->
</div>
</table>
 <!-- Style button complete -->   
<!-- Toolbox button -->
<button id="hamburgerButton" class="cool-button" style="padding: 10px 25px; 
    color: white; 
    border: none; 
    border-radius: 10px; 
    font-size: 1rem; 
    cursor: pointer; 
    position: fixed; 
    bottom: 0px; 
    right: 20px; 
    z-index: 1;
    background: #33343c;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    transform: translateY( -22px);
  ">
  <b> Toolbox</b>
</button>
<!-- Draggable elements (toolbox) -->
<div id="toolboxContainer" style="
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    transform: translateX(100%);
    opacity: 0;
    position: fixed;
    bottom: 65px;
    right:10px;
    bottom: 95px;
    border-radius: 5px;
    z-index: 999;
    background: #33343c;
    border-radius:7px;
">
    <div style="
    cursor: grab; margin: 2px; 
    padding: 5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none;
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="H1" class="draggable" draggable="true" title="Header">
    Header
</div>
    <div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color:#fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="text" class="draggable" draggable="true" title="Text">Text</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="textarea" class="draggable" draggable="true" title="Textarea">TextArea</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding: 5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color:#fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="button" class="draggable" draggable="true" title="Button">Button</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="select" class="draggable" draggable="true" title="Selectbox">Select</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="checkbox" class="draggable" draggable="true" title="Checkbox">Checkbox</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="radio" class="draggable" draggable="true" title="Radio">Radio</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding: 5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="image" class="draggable" draggable="true" title="Image">Image</div>
<div style="
    cursor: grab; 
    margin: 2px; 
    padding:  5px 15px; 
    background: #7f8388;
    background-size: 100% 100%;
    background-position: center;
    background-blend-mode: multiply;
    color: #fff; 
    border: none; 
    border-radius: 7px; 
    text-align: center; 
    font-size: 0.8rem; 
    transition: transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.3s ease;
    z-index: 1 ;
" id="paragraph" class="draggable" draggable="true" title="Paragraph">Paragraph</div>
    <!-- Title display area -->
</div>
<!-- Toolbox button complete -->

<!-- download button script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<!-- download button script complete -->    

    <script src="RDF_ACTION/dragAndDropAction.js"></script>
