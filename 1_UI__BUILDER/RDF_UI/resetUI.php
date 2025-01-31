<table class="section" style="max-width: 400px; margin: 40px auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1); border-radius: 10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
    <tr>
        <td colspan="2" style="text-align: center;">
            <h2 style="margin-top: 0; color: #333; font-weight: bold;">Reset Password</h2>
        </td>
    </tr>
    <tr>
        <td><label for="email">Email:</label></td>
        <td>
            <input type="email" id="email" name="email" autocomplete="email" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <div id="emailError" style="color: red; font-size: 0.8em;"></div>
        </td>
    </tr>
    <tr>
        <td><label for="newPassword">New Password:</label></td>
        <td>
            <div style="position: relative;">
                <input type="password" id="newPassword" name="newPassword" style="width: calc(100% - 30px); padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <span style="cursor:pointer;" id="togglePassword" class="toggle-password" onclick="togglePasswordVisibility('newPassword')">👁️</span>
            </div>
            <div id="passwordError" style="color: red; font-size: 0.8em;"></div>
        </td>
    </tr>
    <tr>
        <td><label for="confirmPassword">Confirm Password:</label></td>
        <td>
            <div style="position: relative;">
                <input type="password" id="confirmPassword" name="confirmPassword" style="width: calc(100% - 30px); padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                <span style="cursor:pointer;" id="toggleConfirmPassword" class="toggle-password" onclick="togglePasswordVisibility('confirmPassword')">👁️</span>
            </div>
            <div id="confirmPasswordError" style="color: red; font-size: 0.8em;"></div>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center; padding-top: 10px;">
            <button type="button" onclick="resetPassword()" style="padding: 10px 20px; border: 0.5px solid grey; border-radius: 10px; cursor: pointer; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">Reset</button>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center; padding-top: 10px;">
            <a href="RDFView.php?ui=loginUI">Login here</a>
        </td>
    </tr>
</table>
<script src="RDF_ACTION/resetAction.js"></script>
