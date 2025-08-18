const mongoose=require('mongoose');

module.exports.connect=async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('ket noi dtb thanh cong')
    } catch (error) {
        console.log('Ket noi dtb that bai')
    }
}