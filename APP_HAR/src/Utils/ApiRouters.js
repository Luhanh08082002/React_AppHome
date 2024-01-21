// const HOST = 'http://192.168.101.110:3001's
// const HOST = 'http://192.168.101.170:3001' 
const HOST = 'http://10.50.7.151:3001' 

export const loginRouter = `${HOST}/login`
export const SignUpRouter = `${HOST}/signup`
export const addRoom = `${HOST}/api/addRoom`
export const getRooms = `${HOST}/api/getRooms`
export const getFilterPriceRoom = `${HOST}/api/filterPrices`
export const getFindLocation = `${HOST}/api/findlocation`

export const  getRoomId = id =>`${HOST}/api/getRoom/${id}`
export const  getRoomSearch = key =>`${HOST}/api/getRoom/search/${key}`


