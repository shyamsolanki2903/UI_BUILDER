
<table class="section" style="max-width: 400px; margin: 40px auto;  background-color: #000; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1); border-radius: 10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;height:650px;margin-top:10px;margin-bottom:10px;">
<tr>
    <td colspan="2" style="text-align: center; color: black; padding-top: 10px; padding-bottom: 0px;">
        <img src="RDF_UI/RDF_MEDIA/userpagelogo.png" alt="logo" style="width: 80px; height: 80px; border-radius: 50px;text-align:center;">
    </td></tr>
    <tr>
      <td colspan="2" style="text-align: center;color: #fff; font-weight: bold;font-size:28px;">Forgot Password</td>
    </tr>
    <!-- <tr>
      <td colspan="2" style="text-align: center;">
        <div id="generalError" style="color: red; font-size: 0.9em;"></div>
      </td>
    </tr> -->
    <tr>
      <td style="color:#fff;text-align:center;"><label for="email">Email :</label></td></tr>
      <tr>
      <td style="text-align:center;"><input type="text" id="email" name="email" autocomplete="email" style="width: 90%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center;">
        <div id="emailError" style="color: red; font-size: 0.9em;"></div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center; padding-top: 10px;">
        <button type="button" onclick="reset()" style="height: 40px; width: 150px; border-radius: 15px; border-color: white; padding: 10px 20px; border: 0.5px solid grey; border-radius: 10px; cursor: pointer; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;background-color:#b835ad;color:#fff;">Reset Password</button>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center;">
        <div id="loader" style="display: none; font-size: 1.2em; color: color:#4d9cc9;">Loading...</div>
      </td>
    </tr>
  </table>

<script src="RDF_ACTION/forgotPasswordAction.js"></script>
