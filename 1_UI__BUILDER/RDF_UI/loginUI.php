<!-- loginUI.php -->
<table class="section" style="max-width: 400px; margin: 40px auto; background-color: #000; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1); border-radius: 10px; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; height: 650px; margin-top: 10px; margin-bottom: 10px;">
    <tr>
        <td style="text-align: center; color: black; padding-top: 10px; padding-bottom: 0px;">
            <img src="RDF_UI\RDF_MEDIA\logo.png" alt="logo" style="width: 80px; height: 80px; border-radius: 50px;">
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center;">
            <h2 style="margin-top: 0; color: #333; font-weight: bold; color: #fff; font-size: 28px;">Login Screen</h2>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center;">
            <span id="loginError" style="color: red; display: none; margin-bottom: 10px;"></span>
        </td>
    </tr>
    <tr>
        <td style="color: #fff; text-align: center; font-size: 20px;"><label for="email">Email</label></td>
    </tr>
    <tr>
        <td style="text-align: center;">
            <input type="email" id="email" name="email" autocomplete="email" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
            <span id="emailError" style="color: red; display: none;"></span>
        </td>
    </tr>
    <tr>
        <td style="color: #fff; text-align: center;"><label for="password">Password:</label></td>
    </tr>
    <tr>
        <td style="position: relative; text-align: center;">
            <input type="password" id="password" name="password" autocomplete="current-password" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">&nbsp;
            <i id="togglePassword" class="toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #fff;">&#128065;</i>
            <span id="passwordError" style="color: red; display: none;"></span>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center; padding-top: 10px;">
            <button type="button" onclick="login()" style="height: 40px; width: 150px; border-radius: 15px; border-color: white; padding: 10px 20px; border: 0.5px solid grey; border-radius: 10px; cursor: pointer; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; background-color: #b835ad; color: #fff;">Login</button>
        </td>
    </tr>

    <tr>
        <td colspan="2" style="text-align: center; padding-top: 10px; color: #fff;">
            <a href="RDFView.php?ui=signUpUI" style="color: #4d9cc9;">Register</a><br>
            <a href="RDFView.php?ui=forgotPasswordUI" style="width: 150px; border-radius: 5px; color: #4d9cc9;">_Forgot Password?_</a>
        </td>
    </tr>
</table>
<script src="RDF_ACTION/loginAction.js"></script>

