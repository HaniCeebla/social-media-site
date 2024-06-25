
import {PrismaClient}from '@prisma/client';

const prisma=new PrismaClient;


// LikesController.js

// ... other imports and code

// Function to find a like
export const findLike = async (usersId) => {
  try {
    const like = await prisma.likes.findFirst({
      where: {
        usersId: usersId
      }
    });
    return like;
  } catch (error) {
    console.error('Error finding like:', error);
    throw error;
  }
};

// Function to create a like
export const createLike = async (usersId) => {
  try {
    const newLike = await prisma.likes.create({
      data: {
        usersId: usersId
        // other fields if needed
      }
    });
    return newLike;
  } catch (error) {
    console.error('Error creating like:', error);
    throw error;
  }
};

// Function to delete a like
export const deleteLike = async (usersId) => {
  try {
    const deletedLike = await prisma.likes.delete({
      where: {
        usersId: usersId
      }
    });
    return deletedLike;
  } catch (error) {
    console.error('Error deleting like:', error);
    throw error;
  }
};


