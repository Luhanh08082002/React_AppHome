const RoomPost = require('../models/Room')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { addPostRoom,
    getPostRooms,
    getPostRoomId,
    searchPostRoom,
    updateRoomID,
    findRegionByID,
    filterRoomPrice } = require('../controllers/RoomController')


router.get('/api/getRooms', getPostRooms)
router.post('/api/addRoom', addPostRoom)
router.get('/api/getRoom/:id', getPostRoomId)
router.get('/api/getRoom/search/:key', searchPostRoom)
router.patch('/api/updateRoom/:id', updateRoomID)
router.get('/api/filterPrices', filterRoomPrice)
router.get('/api/findlocation', findRegionByID)




module.exports = router