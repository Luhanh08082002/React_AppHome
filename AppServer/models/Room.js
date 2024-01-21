const mongoose = require('mongoose');

const RomPostSchema = new mongoose.Schema({
  imageRoom: {
    type: [String],
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  kindOfRoom: {
    type: String,
    required: true,
  },
  gioitinh: {
    type: String,
    required: true,
  },
  agreeAll: {
    type: Boolean,
    default: false,
  },
  price: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  informationRoom: {
    tang: {
      type: String,
      required: true,
    },
    khonggian: {
      type: String,
      required: true,
    },
    datcoc: {
      type: String,
      required: true,
    },
    soNguoio: {
      type: Number,
      required: true,
    },
  },
  service: {
     type: [String],
    required: true,
  },
    
  interior: {
    type: [String],
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactPhone: {
      type: String,
      required: true,
  },
  // contactPhone: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (value) {
  //       // Kiểm tra số điện thoại có đúng định dạng hay không
  //       return /^\d{10}$/.test(value);
  //     },
  //     message: 'Số điện thoại không hợp lệ'
  //   }
  // },
},{timestamps:true})

module.exports = mongoose.model('RoomPost', RomPostSchema)