export const EMAIL_TEMPLATES = {
  DIGICODE_CODE: {
    subject: 'Vos Codes pour le Digicode',
    text: (codes: { date: string; code: string }[]) => {
      let textContent = 'Bonjour,\n\nVoici vos codes pour le digicode :\n\n';
      codes.forEach(({ date, code }) => {
        textContent += `${date} : ${code}\n`;
      });
      textContent += "\nMerci,\nL'équipe de Support";
      return textContent;
    },
    html: (codes: { date: string; code: string }[]) => {
      let htmlContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vos Codes pour le Digicode</title>
          <style>
             body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 20px;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .code-item {
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
            }
            .date {
              font-weight: bold;
              color: #333;
              display: inline-block;
              width: 150px;
            }
            .code {
              display: inline-block;
              color: #333;
            }
            .footer {
              margin-top: 20px;
              font-size: 0.9em;
              color: #555;
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Bonjour,</h1>
            <p>Voici vos codes pour le digicode :</p>
      `;
      codes.forEach(({ date, code }) => {
        htmlContent += `
            <div class="code-item">
              <span class="date">${date}  : </span>
              <span class="code">${code}</span>
            </div>
        `;
      });
      htmlContent += `
            <p class="footer">Merci,<br>L'équipe de Support</p>
          </div>
        </body>
        </html>
      `;
      return htmlContent;
    },
  },
};
