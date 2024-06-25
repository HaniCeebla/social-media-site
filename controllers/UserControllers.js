import {PrismaClient}from '@prisma/client'
import bcrypt from 'bcrypt';
import {generateToken} from'../helpers/jwt.js';


const prisma=new PrismaClient();

//create user//

export const createUser = async (req,res)=>{
    try {
        const { username, lastname, email, password} = req.body;

        if(!username|| !lastname|| !email||  !password)
        return res.status(400).json({
        isSuccess:false,
        message: "Invalid username"
    });
    const hashedpassword =bcrypt.hashSync(password,10)

    const newUser= await prisma.users.create({
        data: {
        username,
        lastname,
        email,
        password: hashedpassword,
        role :"User"
        }
    });
    res.status (201).json({
        isSuccess: true,
        message:"success",
        newUser,
    });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccess: false,
            message:"failure create user",
        })
        
    }
};

//login userwith hashed password
export const loginUser = async(req,res)=>{
    try {

      const{email, password } = req.body;
  
      // check garee loginka//
      const user = await prisma.users.findFirst({
        where: {
          email,

        },
      });

      if(!user){
        return res.status(404).json({
            isSuccess:false,
             message: "invalid_user",
         });
      }
     
      // check the password//
      const isValidPassword = bcrypt.compareSync(password, user.password);
       if(!isValidPassword)
       return res.status(404).json({
          isSuccess:false,
          message: "invalid_credentials"
      }); 
      res.status(200).json({
        isSuccess: true,
        message: 'Success',
        user:{
          id: user.id,
        //   username: user.username,
        //   lastname: user.lastname,
          email: user.email,
          password: user.password,
          createdAt: user.created_at,
          updateAt: user.created_at,
         
        },
  
        token:generateToken(user),
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
          isSuccess:false,
          message: "failed to login user",
      });
    }
  };




export const getUserDetails= async(req, res) =>{
    try {
        const {usersId}=req.params;

        //iska hubi user//

        const user = await prisma.users.findFirst({
            where:{
                id:+usersId,
            }
        });
        if(!user)
        return res.status(404).json({
        isSuccess:false,
        message: 'User not found',
    });
    res.json({
        isSuccess:true,
        message:"success",
        user,
    });
        
    } catch (error) {
        // console.log(error);
        // res.status(400),json({
        //     isSuccess: false,
        //     message:"failure create user",
        // })

        
    }
};

//update garee userk//
export const updateUser =async(req,res)=>{
    try {
        const{username,lastname,email, userId}=req.body;
        if(!username|| !lastname|| !email|| !userId)return res.status (400).json({
            isSuccess:false ,
            message: 'Invalid username',

        })
        //check garee//
 const isUserAvailable = await prisma.users. findFirst({
    where:{
        id: +userId,
    },
 });
 if(isUserAvailable){
    return res.status(404).json({
        isSuccess:false,
        message:"isUserAvailable",
    })
 }
 const updateUser = await prisma.users.update({
    where:{
        id:+userId,
    },
    data:{
        username,
        lastname,
        email,
        password,
    },
 });
 res.json({
    isSuccess: true,
    message:'success',
    user:{...updateUser,},
 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to update user",
        });
        
    }
};

//active garee user//

export const activeUser =async (req,res)=>{
    try {
        const {userId}=req.params;
        const user=await prisma.users.findFirst({
            where:{
                id:+userId,
            },
        });
        if(!user){
            return res.status(404).json({
                isSuccess:false,
                message: 'User not found',
            });
        }
        await prisma.users.update({
            where:{
                id:+userId,
            },
            data:{
                isActive:true,

            },
        });
        res.json({
            isSuccess:true,
            message:'Success',
            user
        });

        
    } catch (error) {
        console.log (error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to activate account",
        });
        
    }

};

//deelte user//

export const deactivateUser=async(req,res)=>{
    try {
        const{userId} =req.params;
        const user= await prisma.user.findFirst({
            where:{
                id:+userId,

            },
        });
        if(!user){
            return res.status(404).json({
                isSuccess:false,
                message:'invalid user',
            });
        }
        await prisma.users.update({
            where:{
                id: +userId,

            },
            data:{
                isActive:false,
            },
        });
        res.json({
            isSuccess:true,
            message:'user is deactivated',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            message:"failed to deactivate user"
        }) ;     
    }
};

//promote user

export const promoteUser = async(req,res)=>{
    try {
        const {userId,role}=req.body;
        const loggedInUser= req.user.id;
        if(!loggedInUser ===userId)
        return res.status(400).json({
        isSuccess:false,
        message:'User not logged in'
    });
    const user = await prisma.users.update({
        where:{
            id: +userId,
        },
        data:{
            role:role.toUpperCase(),
        },

    });
    res.status(200).json({
        isSuccess: true,
        message:'user promoted successfully',
        user,
    });

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message:"User could not be promoted"
        });
    }

}


//change password//

export const changePassword = async (req,res) => {
    try {
    const {newPassword, oldPassword} =  req.body;
    const { id } = req.user;
    const user = await prisma.users.findFirst({
      where: {
        id: +id,
      },
    });
  
    const isOldPasswordCorrect = bcrypt.compareSync(
      oldPassword,
      user.hashedPassword
    );
    //hash nnew password//
    const hashedPassword =bcrypt.hashSync(newPassword, 10);
    if(!isOldPasswordCorrect)
    return res.status(404).json({
      isSuccess:false,
      message: "invalid old password",
    });
    
    const updateUserPassword = await prisma.users.update({
        
      where: {
        id: +id,
      },
      data: {
        hashedPassword,
      },
    });
    res.status(200).json({
      isSuccess: true,
      message: 'password changed successfully',
      
    });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        isSuccess: false,
        message: 'failed to change password',
      });
      
    }
  };