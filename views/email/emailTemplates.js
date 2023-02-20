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

          <style>
            @import url('https://use.typekit.net/fnq4taz.css');
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
              margin: 0 auto;
              width: 70%;
              height: 8rem;
              background-color: #58b15a;
            }

            h1 {
              font-family: goodlife-brush, sans-serif;
              font-size: 4rem;
            }

            h2 {
              font-family: goodlife-brush, sans-serif;
              font-size: 2rem;
            }

            .title {
              text-align: center;
              padding-top: 2rem;
            }

            .main {
              margin: 0 auto;
              width: 70%;
              height: 100%;
              background-color: #d2dad2;
            }

            .main-body {
              text-align: center;
              height: 100%;
            }

            .main-body-para {
              font-size: 1.6rem;
              padding-top: 2rem;
              padding-bottom: 2rem;
            }

            .foooter-title {
              text-align: left;
              padding: 2rem;
            }

            button {
              padding: 1rem 3rem 1rem 3rem;
              border: none;
              background-color: black;
              border-radius: 2rem;
              font-family: inherit;
            }

            a,
            a:link,
            a:active {
              text-decoration: none;
              color: #58b15a;
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
              <h1 class="title">VESearch</h1>
            </header>

            <main class="main">
              <div class="main-body">
                <p class="main-body-para">
                  Hey, ${this.options.username}! Please find below your password reset link:
                </p>
                <button class="main-body-link">
                  <a href="${this.options.url}">Reset Password</a>
                </button>
                <p class="main-body-para">
                  If you didn't request this link, please simply ignore it.
                </p>
              </div>
            </main>

            <footer class="footer">
              <h2 class="foooter-title">VESearch</h2>
            </footer>
          </div>
        </body>
      </html>
    `;
  }

  welcomeMessage() {
    return ` <!DOCTYPE html>
    <html lang="en">
      <head>

        <style>
          @import url('https://use.typekit.net/fnq4taz.css');
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
            margin: 0 auto;
            width: 70%;
            height: 8rem;
            background-color: #58b15a;
          }

          h1 {
            font-family: goodlife-brush, sans-serif;
            font-size: 4rem;
          }

          h2 {
            font-family: goodlife-brush, sans-serif;
            font-size: 2rem;
          }

          .title {
            text-align: center;
            padding-top: 2rem;
          }

          .main {
            margin: 0 auto;
            width: 70%;
            height: 100%;
            background-color: #d2dad2;
          }

          .main-body {
            text-align: center;
            height: 100%;
          }

          .main-body-para {
            font-size: 1.6rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .foooter-title {
            text-align: left;
            padding: 2rem;
          }

          button {
            padding: 1rem 3rem 1rem 3rem;
            border: none;
            background-color: black;
            border-radius: 2rem;
            font-family: inherit;
          }

          a,
          a:link,
          a:active {
            text-decoration: none;
            color: #58b15a;
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
            <h1 class="title">VESearch</h1>
          </header>

          <main class="main">
            <div class="main-body">
              <p class="main-body-para">
                Hey, ${this.options.username}! Welcome to VESearch, thanks for signing up! Below you'll find a bit of information about this web app.
              </p>
              <p class="main-body-para">
                ...
              </p>
            </div>
          </main>

          <footer class="footer">
            <h2 class="foooter-title">VESearch</h2>
          </footer>
        </div>
      </body>
    </html>`;
  }

  deletionMessage() {
    return `this is html`;
  }
};
