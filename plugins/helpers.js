// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { Agent } from 'https'
import Axios from 'axios'
import Filesize from 'filesize'
import GetFlagEmoji from 'country-code-emoji'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// //////////////////////////////////////////////////// CreateAxiosAuthTransport
const CreateAxiosAuthTransport = (baseURL) => {
  return Axios.create({
    withCredentials: true,
    baseURL,
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  })
}

// ////////////////////////////////////// Convert bytes to human-readable format
// ----------------------------- Ex: 257831078666960800 bytes outputs as 229 PiB
const FormatBytes = (bytes, format = 'string') => {
  const size = Filesize(bytes, { standard: 'iec', base: 2 })
  if (format === 'string') { return size }
  const split = size.split(' ')
  return { value: split[0], unit: split[1] }
}

// //////////////////////////////////////////// Get a flag icon based on isoCode
const GetFlagIcon = (isoCode) => {
  try {
    return GetFlagEmoji(isoCode)
  } catch (e) {
    return '🌐'
  }
}

// /////////////////////////////////////////////////////// Convert epoch to date
const EpochToDate = app => (epoch, format = 'MMM D, YYYY') => {
  return app.$moment.unix(epoch * 30 + 1598306400).tz('UTC').format(format)
}

// /////////////////////////////////////////////////////// Add text to clipboard
const AddTextToClipboard = (text) => {
  const container = document.createElement('textarea')
  container.style.position = 'fixed'
  container.style.left = '-99999px'
  container.style.zIndex = '-1'
  container.style.opacity = '0'
  container.style.pointerEvents = 'none'
  container.innerHTML = text
  document.body.appendChild(container)
  container.select()
  document.execCommand('copy')
  document.body.removeChild(container)
}

// ////////////////////////////////////////////////////// Throttle From Lodash
// ---------------------------------------------------------------------------
const Throttle = (func, wait, options) => {
  let context
  let args
  let result
  let timeout = null
  let previous = 0
  if (!options) { options = {} }
  const later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) { context = args = null }
  }
  return function () {
    const now = Date.now()
    if (!previous && options.leading === false) { previous = now }
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) { clearTimeout(timeout); timeout = null }
      previous = now
      result = func.apply(context, args)
      if (!timeout) { context = args = null }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    } return result
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ app, store, $config }, inject) => {
  inject('AxiosAuth', CreateAxiosAuthTransport($config.backendUrl))
  inject('FormatBytes', FormatBytes)
  inject('GetFlagIcon', GetFlagIcon)
  inject('EpochToDate', EpochToDate(app))
  inject('AddTextToClipboard', AddTextToClipboard)
  inject('Throttle', Throttle)
}
