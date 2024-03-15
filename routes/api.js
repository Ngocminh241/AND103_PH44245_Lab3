var express = require('express');
var router = express.Router();

//thêm model
const Distributors = require('../model/distributors')
const Fruits = require('../model/fruits')
//Api thêm distributor
router.post('/add-distributor', async(req, res) =>{
    try{
        const data = req.body; //lấy dữ liệu từ body
        const newDistributors = new Distributors({
            name: data.name
        });
        const result = await newDistributors.save(); //thêm vào database
        if(result){
            res.json({
                "status": 200,
                "messenger" : "Thêm thành công",
                "data" : result
            })
        }else{
            res.json({
                "status": 400,
                "messenger" : "Lỗi, thêm không thành công",
                "data" : []
            })
        }
    }catch(error){
        console.log(error);
    }
});

//Api thêm fruit
router.post('/add-fruit', async(req, res) =>{
    try{
        const data = req.body; //lấy dữ liệu từ body
        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        });//tạo ra một đối tượng mới
        const result = await newFruit.save(); //thêm vào database
        if(result){
            res.json({
                "status": 200,
                "messenger" : "Thêm thành công",
                "data" : result
            })
        }else{
            res.json({
                "status": 400,
                "messenger" : "Lỗi, thêm không thành công",
                "data" : []
            })
        }
    }catch(error){
        console.log(error);
    }
});

//list fruit
router.get('/get-list-fruit', async(req, res) =>{
    try{
        const data = await Fruits.find().populate('id_distributor'); //lấy dữ liệu từ body
        res.json({
            "status": 200,
            "messenger" : "Danh sách Fruit",
            "data" : data
            })
    }catch(error){
        console.log(error);
    }
});

//chi tiết fruit theo id
router.get('/get-list-fruit-by-id/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const data = await Fruits.findById(id).populate('id_distributor'); //lấy dữ liệu từ body
        res.json({
            "status": 200,
            "messenger" : "Danh sách Fruit",
            "data" : data
            })
    }catch(error){
        console.log(error);
    }
});

//get danh sách fruit (danh sách trả về gồm: name, quantity, price, id_ditributor)
//nằm trong khoảng giá (query giá cao nhất, giá thấp nhất) và sắp xếp theo
//quantity (giảm dần)
router.get('/get-list-fruit-in-price', async(req, res) =>{
    try{
        const {price_start, price_end} = req.query;
        const query = {price: {$gte: price_start, $lte: price_end}}
        const data = await Fruits.find(query, 'name quantity price id_distributor')
        .populate('id_distributor')
        .sort({quantity: -1})
        .skip(0)
        .limit(2); //lấy dữ liệu từ body
        res.json({
            "status": 200,
            "messenger" : "Thêm thành công",
            "data" : data
            })
    }catch(error){
        console.log(error);
    }
});
//Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor)
//có chữ cái bắt đầu tên là A hoặc X
router.get('/get-list-fruit-have-name-a-or-x', async(req, res) =>{
    try{
        const query = {$or: [
            {name: {$regex: 'A'}},
            {nam: {$regex: 'X'}},
        ]}
        const data = await Fruits.find(query, 'name quantity price id_distributor')
        .populate('id_distributor')
        //lấy dữ liệu từ body
        res.json({
            "status": 200,
            "messenger" : "Thêm thành công",
            "data" : data
            })
    }catch(error){
        console.log(error);
    }
});

//CẬP NHẬT FRUITS BẰNG ID (PUT)
router.put('/update-fruit-by-id/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const data = req.body;
        const updatefruit = await Fruits.findById(id);
        let result = null;
        if(updatefruit){
            updatefruit.name = data.name ?? updatefruit.name;
            updatefruit.quantity = data.quantity ?? updatefruit.quantity;
            updatefruit.price = data.price ?? updatefruit.price;
            updatefruit.status = data.status ?? updatefruit.status;
            updatefruit.image = data.image ?? updatefruit.image;
            updatefruit.description = data.description ?? updatefruit.description;
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor;
            result = await updatefruit.save();
        }
        if(result){
             res.json({
            "status": 200,
            "messenger" : "Sửa thành công",
            "data" : result
            })
        }else{
            res.json({
                "status": 400,
                "messenger" : "Lỗi, Sửa không thành công",
                "data" : []
            })
        }
       
        //lấy dữ liệu từ body
       
    }catch(error){
        console.log(error);
    }
});
module.exports = router;