module.exports = class Template {
  constructor(template, options) {
    this.template = template;
    this.options = options;
  }

  render() {
    if (this.template === 'passwordReset') return this.passwordReset();
    if (this.template === 'welcomeMessage') return this.welcomeMessage();
    if (this.template === 'deletionMessage') return this.deletionMessage();
  }

  passwordReset() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <style>
          *,
          *::after,
          *::before {
            padding: 0;
            margin: 0;
            box-sizing: inherit;
          }
    
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
    
          body {
            font-family: 'bookmania', serif;
          }
    
          .container {
            width: 100%;
          }
    
          .header,
          .footer {
            display: table;
            margin: 0 auto;
            width: 60%;
            height: 8rem;
            background-color: #58b15a;
          }
    
          h1 {
            font-size: 3rem;
            padding-bottom: 1rem;
          }
    
          h2 {
            font-size: 2rem;
          }
    
          .title {
            text-align: center;
            padding-top: 2rem;
          }
    
          .main {
            margin: 0 auto;
            padding: 2.4rem;
            width: 60%;
            height: 100%;
            background-color: #d2dad2;
          }
    
          .main-body {
            text-align: center;
            height: 100%;
          }
    
          .main-body-para {
            font-size: 1.8rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
    
          .foooter-title {
            text-align: left;
            padding: 2rem;
          }
    
          .img-header {
            display: block;
            margin: 0 auto;
          }
    
          .footer {
            position: relative;
            height: 12rem;
          }
    
          .img-footer {
            display: block;
            margin-left: 4rem;
          }
    
          .footer span {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
          }
    
          .button-link,
          .button-link:link,
          .button-link:active {
            color: #58b15a;
          }
    
          .footer-link,
          .footer-link:link,
          .footer-link:active {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: rgb(0, 0, 0);
            text-decoration: underline;
          }
    
          .footer-link,
          .footer-link:hover,
          .footer-link:visited {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: #d2dad2;
          }
    
          button {
            height: 5rem;
            width: 18rem;
            padding: 1rem 3rem 1rem 3rem;
            border: none;
            background-color: black;
            font-family: inherit;
    
            cursor: pointer;
          }
    
          a,
          a:link,
          a:active {
            text-decoration: none;
            font-size: 1.6rem;
          }
        </style>
    
        <title>${this.options.subject}</title>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <img
              class="img-header"
              src="./templates/imgs/vesearch-logo.png"
              height="120px"
              alt="VESearch logo"
            />
          </header>
    
          <main class="main">
            <div class="main-body">
              <h1 class="title">Your Password Reset Link Has Arrived!</h1>
              <p class="main-body-para">
                Hey, ${this.options.username}! Please find below your password reset link:
              </p>
              <button class="main-body-link">
                <a class="button-link" href="${this.options.url}">Reset Password</a>
              </button>
              <p class="main-body-para">
                If you didn't request this link, please simply ignore it.
              </p>
            </div>
          </main>
    
          <footer class="footer">
            <img
              class="img-footer"
              src="./templates/imgs/vesearch-logo.png"
              height="100px"
              alt="VESearch logo"
            />
            <a class="footer-link" href="https://www.jameskevinwoodruff.com"
              >By Atomic Mammoth Media</a
            >
          </footer>
        </div>
      </body>
    </html>
    
    `;
  }

  welcomeMessage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          *,
          *::after,
          *::before {
            padding: 0;
            margin: 0;
            box-sizing: inherit;
          }
    
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
    
          body {
            font-family: 'bookmania', serif;
          }
    
          .container {
            width: 100%;
          }
    
          .header,
          .footer {
            display: table;
            margin: 0 auto;
            width: 60%;
            height: 8rem;
            background-color: #58b15a;
          }
    
          h1 {
            font-size: 2.4rem;
            padding-bottom: 1rem;
          }
    
          h2 {
            font-size: 2rem;
          }
    
          .title {
            text-align: center;
            padding-top: 2rem;
          }
    
          .main {
            margin: 0 auto;
            padding: 2.4rem;
            width: 60%;
            height: 100%;
            background-color: #d2dad2;
          }
    
          .main-body {
            text-align: center;
            height: 100%;
          }
    
          .main-body-para {
            margin: 0 auto;
            width: 80%;
            font-size: 1.8rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
    
          .foooter-title {
            text-align: left;
            padding: 2rem;
          }
    
          .img-header {
            display: block;
            margin: 0 auto;
          }
    
          .footer {
            position: relative;
            height: 12rem;
          }
    
          .img-footer {
            display: block;
            margin-left: 4rem;
          }
    
          .footer span {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
          }
    
          .button-link,
          .button-link:link,
          .button-link:active {
            color: #58b15a;
          }
    
          .footer-link,
          .footer-link:link,
          .footer-link:active {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: rgb(0, 0, 0);
            text-decoration: underline;
          }
    
          .footer-link,
          .footer-link:hover,
          .footer-link:visited {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: #d2dad2;
          }
    
          .leaf-icon {
            width: 20px;
            color: #58b15a;
          }
    
          button {
            height: 5rem;
            width: 18rem;
            padding: 1rem 3rem 1rem 3rem;
            border: none;
            background-color: black;
    
            font-family: inherit;
    
            cursor: pointer;
          }
    
          a,
          a:link,
          a:active {
            text-decoration: none;
            font-size: 1.6rem;
          }
        </style>
    
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <title>${this.options.subject}</title>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <img class="img-header" src="${this.options.url}/views/email/templates/imgs/vesearch-logo.png" alt="VESearch logo" height="120px" />
          </header>
    
          <main class="main">
            <div class="main-body">
              <h1>Hey, ${this.options.username}! 👋</h1>
              <p class="main-body-para">
                Welcome to VESearch!
                <br />
                <br />
                Below you'll find a bit of information about this web app:
              </p>
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <p class="main-body-para">
                This vegan recipe search engine web application was built by James
                Kevin Woodruff as part of a learning process. He built the backend
                API using Node.js and the frontend using React.js in an attempt to
                learn more about web technologies. It is likely to be rough around
                the edges. Please report any issues you find with the app to
                soygazer(at)gmail.com.
              </p>
              <button class="main-body-link">
                <a class="button-link" href="${this.options.url}">Try VESearch</a>
              </button>
            </div>
          </main>
    
          <footer class="footer">
            <img class="img-footer" src="${this.options.url}/views/email/templates/imgs/vesearch-logo.png" alt="VESearch logo" height="100px" />
            <a class="footer-link" href="https://www.jameskevinwoodruff.com"
              >By Atomic Mammoth Media</a
            >
          </footer>
        </div>
      </body>
    </html>
    `;
  }

  deletionMessage() {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          *,
          *::after,
          *::before {
            padding: 0;
            margin: 0;
            box-sizing: inherit;
          }
    
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
    
          body {
            font-family: 'bookmania', serif;
          }
    
          .container {
            width: 100%;
          }
    
          .header,
          .footer {
            display: table;
            margin: 0 auto;
            width: 60%;
            height: 8rem;
            background-color: #58b15a;
          }
    
          h1 {
            font-size: 2.4rem;
            padding-bottom: 1rem;
          }
    
          h2 {
            font-size: 2rem;
          }
    
          .title {
            text-align: center;
            padding-top: 2rem;
          }
    
          .main {
            margin: 0 auto;
            padding: 2.4rem;
            width: 60%;
            height: 100%;
            background-color: #d2dad2;
          }
    
          .main-body {
            text-align: center;
            height: 100%;
          }
    
          .main-body-para {
            margin: 0 auto;
            width: 80%;
            font-size: 1.8rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
    
          .foooter-title {
            text-align: left;
            padding: 2rem;
          }
    
          .img-header {
            display: block;
            margin: 0 auto;
          }
    
          .footer {
            position: relative;
            height: 12rem;
          }
    
          .img-footer {
            display: block;
            margin-left: 4rem;
          }
    
          .footer span {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
          }
    
          .button-link,
          .button-link:link,
          .button-link:active {
            color: #58b15a;
          }
    
          .footer-link,
          .footer-link:link,
          .footer-link:active {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: rgb(0, 0, 0);
            text-decoration: underline;
          }
    
          .footer-link,
          .footer-link:hover,
          .footer-link:visited {
            position: absolute;
            margin-left: 7rem;
            bottom: 2rem;
    
            font-size: 1rem;
            color: #d2dad2;
          }
    
          .leaf-icon {
            width: 20px;
            color: #58b15a;
          }
    
          button {
            height: 5rem;
            width: 18rem;
            padding: 1rem 3rem 1rem 3rem;
            border: none;
            background-color: black;
    
            font-family: inherit;
    
            cursor: pointer;
          }
    
          a,
          a:link,
          a:active {
            text-decoration: none;
            font-size: 1.6rem;
          }
        </style>
    
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <title>${this.options.subject}</title>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <img class="img-header" src="${this.options.url}/views/email/templates/imgs/vesearch-logo.png" height="120px" />
          </header>
    
          <main class="main">
            <div class="main-body">
              <h1>Hey, ${this.options.username}! 👋</h1>
              <p class="main-body-para">
                ...Or should we say, Bye 😭. 
                <br />
                <br />
                From today, you'll have 14 days to sign back into your account to
                reactivate it. After 14 days, if you haven't signed back in, your
                account will be deleted, however, all your  yummy recipes will
                remain for everyone to view. If, for some reason, you also wish for
                all your recipes to be removed, please email hello(at)VESearch.com,
                to request this.
              </p>
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <img
                class="leaf-icon"
                src="${this.options.url}/views/email/templates/imgs/leaf-icon.svg"
                alt="leaf icon svg"
              />
              <p class="main-body-para">
                If you ultimately maintain that deleting your account is the right
                decision for you. Please remember you are always welcome to use
                VESearch to search your favourite recipes. Please visit us again
                soon.
              </p>
              <button class="main-body-link">
                <a class="button-link" href="${this.options.url}">VESearch</a>
              </button>
            </div>
          </main>
    
          <footer class="footer">
            <img class="img-footer" src="${this.options.url}/views/email/templates/imgs/vesearch-logo.png" height="100px" />
            <a class="footer-link" href="https://www.jameskevinwoodruff.com"
              >By Atomic Mammoth Media</a
            >
          </footer>
        </div>
      </body>
    </html>`;
  }
};
