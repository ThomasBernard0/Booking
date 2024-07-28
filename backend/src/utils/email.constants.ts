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
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            .code-item {
              margin-bottom: 10px;
            }
            .date {
              font-weight: bold;
              color: #007bff;
            }
            .code {
              display: inline-block;
              padding: 5px;
              font-size: 16px;
              font-weight: bold;
              color: #fff;
              background-color: #007bff;
              border-radius: 3px;
            }
            .footer {
              margin-top: 20px;
              font-size: 0.9em;
            }
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
              <span class="date">${date}</span> : <span class="code">${code}</span>
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
