export const getRandomAccessCode = () : number => {
  const minm = 100000;
  const maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

export const getIP = (req) => {
  let ip = req.headers['x-forwareded-for'] || req.connection.remoteAddress
  ip = ip.replaceAll('::', '')
  ip = ip.replaceAll(':', '')
  const [realIP, ] = ip.split(',')
  return realIP
}

export const removeItem = (arr, func) => {
  var index = arr.findIndex(func)
  console.log('index', index)
  const len = arr.length
  if(!len || index == -1 ) return undefined 
  const ret = arr[index]
  for(var i = index + 1; i < len ; i++)
    arr[i - 1] = arr[i]
  arr.length = len - 1
  return ret
}

export const getAverage = (o, func) => o.reduce(func) / o.length