<?php
    // Get the 'image' parameter from the URL
    $imageSrc = isset($_GET['image']) ? $_GET['image'] : '';

    // Extract the base name of the image to create the corresponding code file name
    $fileName = basename($imageSrc, ".png"); // Remove .png extension
    $codeFilePath = "RDF_UI/RDF_CODES/" . $fileName . ".txt"; // Change the extension to .txt

    // Check if the file exists
    $fileExists = file_exists($codeFilePath);
?>

<!-- Use flexbox to center the content and move the download button to the bottom -->
<center style="background: #10131a; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 50vh;">
    <table class="section" style="align-items: center; width: 90vw; height: 70vh; max-width: 320px; position: relative; background: #10131a;">
        <tr>
            <td style="border: 5px solid #333; border-radius: 20px; background: #f5f5f5; text-align: center; display: flex; justify-content: center; align-items: center; min-height: 0px; max-width: 90%; height: 100%; padding: 0; margin: 0; margin-left: 10px">
                <!-- Display the image if the parameter is set -->
                <?php if ($imageSrc): ?>
                    <img src="<?php echo $imageSrc; ?>" style="width: 100%; height: 100%; object-fit: fill; border-radius: 20px; margin: 0; padding: 0;" alt="Selected Image">
                <?php else: ?>
                    <p>No image selected.</p>
                <?php endif; ?>
            </td>
        </tr>
    </table>

    <!-- Download Button at the Bottom -->
    <div style="display: flex; justify-content: center; align-items: flex-end; width: 100%; height: 7vh;">
        <?php if ($imageSrc): ?>
            <?php if ($fileExists): ?>
                <a id="downloadBtn" href="<?php echo $codeFilePath; ?>" download style="color: #fff; font-size: 16px; text-decoration: none; 
                padding: 12px 24px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); 
                border-radius: 30px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
                transition: all 0.3s ease;">
                    Download Code
                </a>
            <?php else: ?>
                <p style="color: red;">The requested file is not available.</p>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</center>

<!-- Responsive script file -->
<script src="RDF_ACTION/screenAction.js"></script>

<!-- Add alert when download button is clicked -->
<script>
    document.getElementById('downloadBtn').addEventListener('click', function() {
        alert('Download complete! This code is designed to run only in RDFView file.');
    });
</script>
