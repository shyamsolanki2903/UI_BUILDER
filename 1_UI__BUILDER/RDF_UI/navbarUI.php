<table class="section" 
    style="width: 100%; height: 7.5vh; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000; background-color: #ffffff; display: flex; justify-content: center; align-items: center; border-radius: 15px; margin: 0; padding: 0;">
    <tr>
        <td style="margin: 0; padding: 0;">
            <table style="width: 100%; display: flex; justify-content: space-around; align-items: center; position: relative; margin: 0; padding: 0;">
                <tr>
                    <td style="width: 70px; text-align: center; margin: 0; padding: 0;">
                        <a href="RDFView.php?ui=homeUI" onclick="toggleText(this)" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;" class="list">
                            <img src="RDF_UI/RDF_MEDIA/homeIMG.jpg" alt="Home" style="width: 25px; height: 25px;margin-left: -50px; margin-top: 5px; filter: brightness(0) saturate(0%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);">
                            <div style="color: #333; font-weight: 400; font-size: 0.8em; margin-top: 4px;margin-left: -47px;"><b>Home</b></div>
                        </a>
                    </td>
                    <td style="width: 70px; text-align: center; margin: 0; padding: 0;">
                        <a href="RDFView.php?ui=dragAndDropUI" onclick="toggleText(this)" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;" class="list">
                            <img src="RDF_UI\RDF_MEDIA\addIMG.jpg" alt="Profile" style="width: 30px; height: 30px; margin-left: 9px; margin-top: 3px; filter: brightness(0) saturate(0%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);">
                            <div style="color: #333; font-weight: 400; font-size: 0.8em; margin-top: 0px;margin-left: 7px;"><b>Create</b></div>
                        </a>
                    </td>
                    <td style="width: 70px; text-align: center; margin: 0; padding: 0;">
                        <a href="RDFView.php?ui=reviewUI" onclick="toggleText(this)" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;" class="list">
                            <img src="RDF_UI/RDF_MEDIA/helpIMG.jpg" alt="Help" style="width: 22px; height: 28px; margin-top: 3px;margin-right: -55px; filter: brightness(0) saturate(0%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);">
                            <div style="color: #333; font-weight: 400; font-size: 0.8em; margin-top: 3px;margin-right: -52px;"><b>Help</b></div>
                        </a>
                    </td>
                </tr>
            </table>

            <!-- Indicator -->
            <div id="indicator" class="indicator" 
                 style="width: 80px; height: 3px; background-color: #ffffff; position: absolute; bottom: 0; left: 0; transition: transform 0.3s ease;">
            </div>
        </td>
    </tr>
</table>

<script src="RDF_ACTION/navbarAction.js"></script>
