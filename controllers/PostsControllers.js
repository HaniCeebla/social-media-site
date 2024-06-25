import {PrismaClient}from '@prisma/client'
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/jwt.js';

const prisma = new PrismaClient();


export const createPosts = async (req, res)=>{
    try {
        const { title, content,usersId}=req.body;
        // const userId= req.params.id ;

        const Posts =await prisma.posts.create({
            data:{
                title,
                content,
                usersId
            },
        });
        res.json({
            message:"posts created",
            Posts,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: true, message:"posts not created",});
        
    }
};

//get all posts
 export const getAllPosts = async (req, res) => {
    const allPosts = await prisma.posts.findMany({
      include: {
        User: {
          select: {
            username: true,
            password: true,
          },
        },
        Comments: true,
        Likes: true,
      },
    });
  
    res.json(allPosts);
  };

  //getone posts
  export const getOnePostsDetails = async (req, res) =>{
    try {
        const {PostsId}=req.params;

        //iska hubi posts//

        const Posts = await prisma.posts.findFirst();
            where:{
                id:+PostsId
            }
        
        if(!Posts)
        return res.status(404).json({
        isSuccess:false,
        message: 'posts are not found',
    });
    res.json({
        isSuccess:true,
        message:"success",
        Posts,
    });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccess: false,
            message:"failure get one posts",
        })

        
    }
};
  

//update garee userk//
export const updatePosts =async(req,res)=>{
    try {
        const{title,content, PostsId}=req.body;
        if(!title|| !content|| !PostsId)return res.status (400).json({
            isSuccess:false ,
            message: 'Invalid posts ',

        })
        //check garee//
 const Posts = await prisma.posts.findFirst({
    where:{
        id: +PostsId,
    },
 });
 if(Posts){
    return res.status(404).json({
        isSuccess:false,
        message:"post not found",
    })
 }
 const updatePosts = await prisma.posts.update({
    where:{
        id:+PostsId,
    },
    data:{
       title,
       content
    },
 });
 res.json({
    isSuccess: true,
    message:'success',
    user:{...updatePosts,},
 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to update Posts",
        });
        
    }
};

//delete posts

export const  deletePosts = async (req,res)=>{
    try {
        const {PostsId} =req.body;
        const Posts =await prisma.posts.findFirst({
            where:{
                id: PostsId,
            },
        });
        if(!Posts)
        return res.status(404).json({
         message:'No Posts found',
    });
    const deletePosts =await prisma.posts.delete({
        where:{
            id:PostsId,
        },
    });
    res.json({
        message:'posts deleted',
        deletePosts
    });
        
    } catch (error) {
        res.json({
            message:'error deleting posts',
        });
        
    }
};

