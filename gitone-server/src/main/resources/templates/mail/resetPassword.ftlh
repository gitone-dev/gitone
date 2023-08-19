<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>${title}</title>
</head>
<body>
<!--[if mso]>
<style>
      body,
      table,
      td,
      th,
      h1,
      h2,
      h3 {
        font-family: Arial, sans-serif !important;
      }
    </style>
<![endif]-->

<p>欢迎来到 ${siteName}！</p>
<p>点击下面链接重置密码：
    <br />
    <a href="${baseUrl}/users/reset-password/${token}">
        ${baseUrl}/users/reset-password/${token}
    </a>
</p>
<p>如果以上链接无法点击，请将它复制并粘贴到你的浏览器的地址栏。</p>
<br />
<p>链接有效期 5 分钟。</p>
<!-- prevent Gmail on iOS font size manipulation -->
<div
        style="
      display: none;
      white-space: nowrap;
      font: 15px courier;
      line-height: 0;
    "
>
</div>
</body>
</html>
