const { google } = require('googleapis')
const sheets = google.sheets('v4')

const getSheetValues = async() => {
  const authClient = await authorize()
  const request = {
    spreadsheetId: process.env.SHEET_ID,
    range: 'B1',
    auth: authClient,
  }

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data
    return response.values[0][0]
  } catch (err) {
    console.error(err)
  }
}

exports.updateSheetValues = async(req, res) => {
  const value = await getSheetValues()
  const authClient = await authorize()
  const newValue = String(Number(value) + 1)
  const request = {
    spreadsheetId: process.env.SHEET_ID,
    range: 'B1',
    valueInputOption: 'RAW',
    auth: authClient,
    resource: {
      "values": [
        [
          newValue
        ]
      ]
    }
  }

  try {
    const response = (await sheets.spreadsheets.values.update(request)).data
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
