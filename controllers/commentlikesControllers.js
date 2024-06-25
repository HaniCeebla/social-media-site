import {PrismaClient}from '@prisma/client'

const prisma = new PrismaClient();


export const createcommentlikes = async (req, res)=>{
    try {
        const {}=req.body;
        const commentsId= req.params.id ;

        const commentlikes=await prisma.commentlikes.create({
            data:{
                commentsId,
            },
        });
        res.json({
            message:"commentlikes created",
            commentlikes,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: true, message:"commentlikes not created",});
        
    }
};

//get all commentlikes
 export const getAllcommentlikes = async (req, res) => {
    const allcommentlikes = await prisma.commentlikes.findMany({
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
  
    res.json(allcommentlikes);
  };

  //getone commentlikes
  export const getOnecommentlikesDetails= async(req, res) =>{
    try {
        const {commentlikesId}=req.params;

        //iska hubi commentlikesta//

        const commentlikes = await prisma.commentlikes.findFirst({
            where:{
                id:+commentlikesId,
            }
        });
        if(!commentlikes)
        return res.status(404).json({
        isSuccess:false,
        message: 'commentlikes are not found',
    });
    res.json({
        isSuccess:true,
        message:"success",
        commentlikes,
    });
        
    } catch (error) {
        console.log(error);
        res.status(400),json({
            isSuccess: false,
            message:"failure get one commentlikes details",
        })

        
    }
};
  

//update garee commentlikes//
export const updatecommentlikes =async(req,res)=>{
    try {
        const{commentlikesId}=req.body;
        if( !commentlikesId)return res.status (400).json({
            isSuccess:false ,
            message: 'Invalid commentlikes ',

        })
        //check garee//
 const commentlikes = await prisma.commentlikes.findFirst({
    where:{
        id: +commentlikesId,
    },
 });
 if(commentlikes){
    return res.status(404).json({
        isSuccess:false,
        message:"commentlikes is not found",
    })
 }
 const updatecommentlikes = await prisma.commentlikes.update({
    where:{
        id:+commentlikesId,
    },
    data:{
       commentsId
    },
 });
 res.json({
    isSuccess: true,
    message:'success',
    user:{...updatecommentlikes,},
 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to update commentlikes",
        });
        
    }
};

//delete commentlikes

// export const  deletecommentlikes = async (req,res)=>{
//     try {
//         const {commentlikesId} =req.body;
//         const commentlikes =await prisma.commentlikes.findFirst({
//             where:{
//                 id: commentlikesId,
//             },
//         });
//         if(!commentlikes)
//         return res.status(404).json({
//          message:'No commentlikes found',
//     });
//     const deletecommentlikes =await prisma.commentlikes.delete({
//         where:{
//             id:commentlikesId,
//         },
//         data:{
//             commentsId,
//         }
//     });
//     res.json({
//         message:'commentlikes deleted',
//     });
        
//     } catch (error) {
//         res.json({
//             message:'error deleting commentlikes',
//         });
        
//     }
// };

// Delete likes
export const deletecommentlikes = async (req, res) => {
    try {
      const PostsId = req.params.id;
  
      await prisma.commentlikes.deleteMany({
        where: {
          PostsId,
          // Add other conditions based on your data model
        },
      });
  
      res.json({
        isSuccess: true,
        message: "commentsLikes deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        isSuccess: false,
        message: "commentLikes not deleted",
      });
    }
  };