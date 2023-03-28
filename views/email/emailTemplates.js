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
        html {
          font-size: 62.5%;
          color: black;
          width: 50%;
          font-family: Georgia, 'Times New Roman', Times, serif;
        }
  
        a {
          font-family: inherit;
          color: black;
          text-decoration: none;
        }
  
        p {
          font-size: 1.4rem;
        }
  
        button {
          padding: 1rem;
          background: #58b15a;
          border: none;
        }
      </style>
  
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <title>${this.options.subject}</title>
    </head>
    <body>
      <div>
      <main>
      <div>
        <h1>Your Password Reset Link Has Arrived!</h1>
        <p>
          Hey, ${this.options.username}! Please find below your password reset link:
        </p>
        <button>
          <a class="button-link" href="${this.options.url}">Reset Password</a>
        </button>
        <p>
          If you didn't request this link, please simply ignore it.
        </p>
      </div>
    </main>
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
          html {
            font-size: 62.5%;
            color: black;
            width: 50%;
            font-family: Georgia, 'Times New Roman', Times, serif;
          }
    
          a {
            font-family: inherit;
            color: black;
            text-decoration: none;
          }
    
          p {
            font-size: 1.4rem;
          }
    
          button {
            padding: 1rem;
            background: #58b15a;
            border: none;
          }
        </style>
    
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <title>${this.options.subject}</title>
      </head>
      <body>
        <div>
          <div>
            <div>
              <h1>Hey, ${this.options.username}! 👋</h1>
              <p>
                Welcome to VESearch!
                <br />
                <br />
                Below you'll find a bit of information about this web app:
              </p>
    
              <p>
                This vegan recipe search engine web application was built by James
                Kevin Woodruff as part of a learning process. He built the backend
                API using Node.js and the frontend using React.js in an attempt to
                learn more about web technologies. It is likely to be rough around
                the edges. Please report any issues you find with the app to
                soygazer(at)gmail.com.
              </p>
              <button>
                <a href="${this.options.url}">Try VESearch</a>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  }

  deletionMessage() {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      html {
        font-size: 62.5%;
        color: black;
        width: 50%;
        font-family: Georgia, 'Times New Roman', Times, serif;
      }

      a {
        font-family: inherit;
        color: black;
        text-decoration: none;
      }

      p {
        font-size: 1.4rem;
      }

      button {
        padding: 1rem;
        background: #58b15a;
        border: none;
      }
    </style>

    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" , content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${this.options.subject}</title>
  </head>
  <body>
    <div>
    <main>
    <div >
      <h1>Hey, ${this.options.username}! 👋</h1>
      <p>
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
      <p >
        If you ultimately maintain that deleting your account is the right
        decision for you. Please remember you are always welcome to use
        VESearch to search your favourite recipes. Please visit us again
        soon.
      </p>
      <button>
        <a href="${this.options.url}">VESearch</a>
      </button>
    </div>
  </main>
    </div>
  </body>
</html>
    `;
  }
};
