import cloudinary from '../lib/cloudinary.js';
import Message from '../models/message.model.js';
import User from'../models/user.model.js'



export const  getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.findById({_id:{$ne:loggedInUserId}}).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserForSidebar", error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages", error.message)
        res.status(500).json({message:'Internal Server Error'})
    }

}

export const sendMessages = async (req, res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id

        let imageUrL;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrL = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrL,
        })
        await newMessage.save();

        // todo: realtime functionally goes here => socket.io

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessages", error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}

