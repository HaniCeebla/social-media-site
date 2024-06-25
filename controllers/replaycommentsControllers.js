import {PrismaClient}from '@prisma/client'

const prisma = new PrismaClient();


export const createreplaycomments = async (req, res)=>{
    try {
        const { content}=req.body;
        const commentsId= req.params.id ;

        const replaycomments =await prisma.replaycomments.create({
            data:{
                content,
                commentsId,
            },
        });
        res.json({
            message:"replaycomments created",
            replaycomments,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: true, message:"replaycomments not created",});
        
    }
};

//get all replaycomments
 export const getAllreplaycomments = async (req, res) => {
    const allreplaycomments = await prisma.replaycomments.findMany({
      include: {
        User: {
          select: {
            username: true,
            password: true,
          },
        },
        comments: true,
      },
    });
  
    res.json(allreplaycomments);
  };

  //getone replaycomments
  export const getOnereplaycommentsDetails= async(req, res) =>{
    try {
        const {replaycommentsId}=req.params;

        //iska hubi replaycomments//

        const replaycomments = await prisma.replaycomments.findFirst({
            where:{
                id:+replaycommentsId,
            }
        });
        if(!replaycomments)
        return res.status(404).json({
        isSuccess:false,
        message: 'replaycomments are not found',
    });
    res.json({
        isSuccess:true,
        message:"success",
        replaycomments,
    });
        
    } catch (error) {
        console.log(error);
        res.status(400),json({
            isSuccess: false,
            message:"failure get one replaycomments details",
        })

        
    }
};
  

//update garee replaycomments//
export const updatereplaycomments =async(req,res)=>{
    try {
        const{content, replaycommentsId}=req.body;
        if( !content|| !replaycommentsId)return res.status (400).json({
            isSuccess:false ,
            message: 'Invalid replaycomments ',

        })
        //check garee//
 const replaycomments = await prisma.replaycomments.findFirst({
    where:{
        id: +replaycommentsId,
    },
 });
 if(replaycomments){
    return res.status(404).json({
        isSuccess:false,
        message:"replaycomments is not found",
    })
 }
 const updatereplaycomments = await prisma.replaycomments.update({
    where:{
        id:+replaycommentsId,
    },
    data:{
       content
    },
 });
 res.json({
    isSuccess: true,
    message:'success',
    user:{...updatereplaycomments,},
 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to update replaycomments",
        });
        
    }
};

//delete replaycomments

export const  deletereplaycomments = async (req,res)=>{
    try {
        const {replaycommentsId} =req.body;
        const replaycomments =await prisma.replaycomments.findFirst({
            where:{
                id: replaycommentsId,
            },
        });
        if(!replaycomments)
        return res.status(404).json({
         message:'No replaycomments found',
    });
    const deletereplaycomments =await prisma.replaycomments.delete({
        where:{
            id:replaycommentsId,
        },
        data:{
            content,
        }
    });
    res.json({
        message:'replaycomments deleted',
    });
        
    } catch (error) {
        res.json({
            message:'error deleting replaycomments',
        });
        
    }
};

