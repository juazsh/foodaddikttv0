import axios from 'axios'
import config from '../config'
export const sendMessage = async (contactNumber, message) => {
  const paylod = {
    Text: message,
    Number: contactNumber,
    SenderId: 'SMSCountry',
    Tool: 'API'
  }
  try {
    const base64Token = Buffer.from(config.secrets.smsAPIKey.concat(':', config.secrets.smsAPIToken)).toString('base64')
    await axios.post(config.secrets.smsAPIUrl, paylod, { headers: { 'Authorization': `Bearer ${base64Token}`}})
  }
  catch(err){
    console.log(err.message)
  }
} 