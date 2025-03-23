// 密码保护功能
document.addEventListener("DOMContentLoaded", function () {
  // 检查是否已授权访问
  if (localStorage.getItem("siteAccessGranted") !== "true") {
    // 创建密码保护层
    const passwordDiv = document.createElement("div");
    passwordDiv.id = "password-protection";
    passwordDiv.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.95); display: flex; justify-content: center; align-items: center; z-index: 9999;";

    const formDiv = document.createElement("div");
    formDiv.style.cssText =
      "background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); text-align: center; max-width: 400px;";

    formDiv.innerHTML = `
            <h2 style="margin-bottom: 20px; color: #333;">Please enter password to access
</h2>
            <input type="password" id="password-input" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;" placeholder="请输入密码">
            <button id="password-submit" style="background-color: #4CAF50; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">提交</button>
            <p id="password-error" style="color: red; margin-top: 10px; display: none;">密码错误，请重试</p>
        `;

    passwordDiv.appendChild(formDiv);
    document.body.appendChild(passwordDiv);

    // 隐藏主内容
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.style.display = "none";
    }

    // 添加密码验证功能
    document
      .getElementById("password-submit")
      .addEventListener("click", checkPassword);
    document
      .getElementById("password-input")
      .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          checkPassword();
        }
      });
  } else {
    // 已授权，显示内容
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.style.display = "block";
    }
  }
});

// 密码验证函数
function checkPassword() {
  const correctPassword = "miyu0531";
  const inputPassword = document.getElementById("password-input").value;

  if (inputPassword === correctPassword) {
    // 密码正确，隐藏保护层，显示内容
    document.getElementById("password-protection").style.display = "none";
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.style.display = "block";
    }

    // 保存授权状态
    localStorage.setItem("siteAccessGranted", "true");
  } else {
    // 密码错误，显示错误信息
    document.getElementById("password-error").style.display = "block";
  }
}
