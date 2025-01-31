<table class="section" style="max-width: 400px; margin: 40px auto;  background-color: #000; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1); border-radius: 10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;height:650px;margin-top:10px;margin-bottom:10px;">
    <tr>
        <td colspan="2" style="text-align: center; color: black; padding-top: 10px; padding-bottom: 0px;">
            <img src="RDF_UI\RDF_MEDIA\logo.png" alt="logo" style="width: 80px; height: 80px; border-radius: 50px;text-align:center;">
        </td>
    </tr>
    <tr>
            <td colspan="2" style="text-align: center;">
                <h2 style="margin-top: 0; color: #333; font-weight: bold;color:#fff;font-size:28px;">Sign Up</h2>
            </td>
        </tr>
        <tr>
            <td style="color:#fff;"><label for="fullName">Full Name:</label></td>
            <td><input type="text" id="fullName" name="fullName" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></td>
        </tr>
        <tr>
            <td style="color:#fff;"><label for="email">Email:</label></td>
            <td>
                <input type="email" id="email" name="email" autocomplete="email" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <span id="emailError" style="color: red;"></span>
            </td>
        </tr>
        <tr>
            <td style="color:#fff;"><label for="mobile">Mobile Number:</label></td>
            <td>
                <input type="tel" id="mobile" name="mobile" maxlength="14" placeholder="+91" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <span id="mobileError" style="color: red;"></span>
            </td>
        </tr>
        <tr>
            <td style="color:#fff;"><label for="password">Password:</label></td>
            <td style="position: relative;">
                <input type="password" id="password" name="password" autocomplete="new-password" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <i class="toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">🔒</i>
                <span id="passwordError" style="color: red;"></span>
            </td>
        </tr>
        <tr>
            <td style="color:#fff;"><label for="confirmPassword">Confirm Password:</label></td>
            <td style="position: relative;">
                <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <i class="toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">🔒</i>
                <span id="confirmPasswordError" style="color: red;"></span>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center; padding-top: 10px;">
                <button type="button" onclick="signUp()" style="height: 40px; width: 150px; border-radius: 15px; border-color: white; padding: 10px 20px; border: 0.5px solid grey; border-radius: 10px; cursor: pointer; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;background-color:#b835ad;color:#fff;">Sign Up</button>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center; padding-top: 10px;">
                <a href="RDFView.php?ui=loginUI" style="color:#4d9cc9;">Login here</a>
            </td>
        </tr>
    </table>
</table>
<script src="RDF_ACTION/signUpAction.js"></script>