const PostRoom = require('../models/Room')

const getPostRooms = async (req, res, next) => {
    const room = await PostRoom.find().sort({ createdAt: -1 })
    try {
        if (room.length > 0) {
            res.json({ status: true, room })
        } else {
            res.json({ status: false, message: 'Không tìm thấy phòng đăng' })
        }
    } catch (error) {
        res.status(401).json({ msg: 'failed to create the RoomPosst', message: error })
    }

}

const getPostRoomId = async (req, res, next) => {
    const roomId = await PostRoom.findById(req.params.id)
    try {
        res.status(200).json({ roomId, status: true })
    } catch (error) {
        res.status(401).json({ msg: 'failed to get the RoomPosstid', message: error })
    }

}

const addPostRoom = async (req, res, next) => {
    const newRoom = new PostRoom(req.body)
    console.log(newRoom)
    try {
        await newRoom.save();
        res.status(200).json({ message: 'thành công', status: true })
    } catch (error) {
        res.status(401).json({ msg: 'failed to create the RoomPosst', message: error })
    }
}

const searchPostRoom = async (req, res) => {
    const searchTerm = req.params.key.replace(/\s/g, '.*');
    const query = {
        $or: [
            { roomName: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
            { location: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
            { description: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
            { kindOfRoom: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
            { address: { $regex: `.*${searchTerm}.*`} }
        ]
    };
    console.log(query)
    try {
        const searchkey = await PostRoom.find(query)
        res.json({ status: true, searchkey })
    } catch (error) {
        res.status(401).json({ msg: 'failed to search the RoomPosst', message: error })
    }
}


const updateRoomID = (req, res) => {
    const id = req.params.id
    console.log(id)
    const updateRoomId = req.body
    console.log(updateRoomId)

    const update = PostRoom.updateOne({ _id: id }, { $set: updateRoomId }).exec()
    res.json({ status: true, message: update })
}

const filterRoomPrice = async (req, res) => {
    const minPrice = req.query.min;
    const maxPrice = req.query.max;
    try {
        const filterPriceRoom = await PostRoom.find({
            price: { $gte: minPrice, $lte: maxPrice }
        }).lean();
        res.json({ status: true, filterPriceRoom })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }

}

const findRegionByID = async (req, res) => {
    const location = req.query.location
    try {
        const data = await PostRoom.find({
            location: location
        })
        res.json({ status: true, data })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}


module.exports = {
    getPostRooms, addPostRoom, getPostRoomId, searchPostRoom, updateRoomID, filterRoomPrice, findRegionByID
}