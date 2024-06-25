import {PrismaClient}from '@prisma/client'

const prisma = new PrismaClient();


export const createcomments = async (req,res)=>{
    try {
        const { content, usersId,PostId}=req.body;
        // const PostsId= req.params.id ;

        const comments =await prisma.comments.create({
            data:{
                content,
                usersId,
                PostId
            },
        });
        res.json({
            message:"comments created",
            comments,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false, message:"comments not created",});
        
    }
};

//get all posts
 export const getAllcomments = async (req, res) => {
    const allcomments = await prisma.comments.findMany({
      include: {
        User: {
          select: {
            username: true,
            password: true,
          },
        },
        Posts: true,
      },
    });
  
    res.json(allcomments);
  };

  //getone comments
  export const getOnecommentsDetails= async(req, res) =>{
    try {
        const {commentsId}=req.params;

        //iska hubi comment//

        const comments = await prisma.comments.findFirst({
            where:{
                id:+commentsId
            }
        });
        if(!comments)
        return res.status(404).json({
        isSuccess:false,
        message: 'comments are not found',
    });
    res.json({
        isSuccess:true,
        message:"success",
        comments,
    });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccess: false,
            message:"failure get one comments details",
        })

        
    }
};
  

//update garee comments//
export const updatecomments =async(req,res)=>{
    try {
        const{content, commentsId}=req.body;
        if( !content|| !commentsId)return res.status (400).json({
            isSuccess:false ,
            message: 'Invalid comments ',

        })
        //check garee//
 const comments = await prisma.comments.findFirst({
    where:{
        id: +commentsId,
    },
 });
 if(comments){
    return res.status(404).json({
        isSuccess:false,
        message:"comments is not found",
    })
 }
 const updatecomments = await prisma.comments.update({
    where:{
        id:+commentsId,
    },
    data:{
       content
    },
 });
 res.json({
    isSuccess: true,
    message:'success',
    user:{...updatecomments,},
 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to update comments",
        });
        
    }
};

//delete comments

export const  deletecomments = async (req,res)=>{
    try {
        const {commentsId} =req.body;
        const comments =await prisma.comments.findFirst({
            where:{
                id: commentsId,
            },
        });
        if(!comments)
        return res.status(404).json({
         message:'No comments found',
    });
    const deletecomments =await prisma.comments.delete({
        where:{
            id:commentsId,
        },
        data:{
            content,
        }
    });
    res.json({
        message:'comments deleted',
    });
        
    } catch (error) {
        res.json({
            message:'error deleting comments',
        });
        
    }
};

