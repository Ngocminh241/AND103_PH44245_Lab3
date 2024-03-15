const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    username: {type: String, unique: true, maxLength: 225},
    password:  {type: String, maxLength: 225},
    email: {type: String, unique: true},
    name: {type: String},
    avatar: {type: String},
    available: {type: Boolean, default: false},
},{
    timestamps: true
})

module.exports = mongoose.model('user', Users)

// mongoose.model('user', Users)
// đặt tên collection, đặt ở dạng số ít
// thư viện mongoose sẽ tự động tạo ra tên collection
// số nhiều (user => users)

// Type: String, Boolean => kiểu dữ liệu 
// unique: true => không được trùng
// maxLength: 225 => ký tự tối đa được nhập
// default: false => giá trị mặc định là false
// timestamps => tạo ra 2 đường createAt và updateAt