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