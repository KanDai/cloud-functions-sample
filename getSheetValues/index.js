const { google } = require('googleapis')
const sheets = google.sheets('v4')

exports.getSheetValues = async(req, res) => {
  const authClient = await authorize()
  const request = {
    spreadsheetId: process.env.SHEET_ID,
    range: 'B1:B3',
    auth: authClient,
  }

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data
    res.status(200).send(response.values)
  } catch (err) {
    console.error(err)
  }
}

async function authorize() {
  return google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
}
