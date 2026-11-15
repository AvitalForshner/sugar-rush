import express from 'express'
import mongoose from 'mongoose'
import Category from '../models/categories.model.js'

const CatgoryController={

  //GET
  getAll: async(req,res)=>{

    try {
    const data = await Category.find();
    res.status(200).json(data);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  },
  //GETBYID
  getById: async(req,res)=>{
    try{
      const{id}=req.params
      const category=await Category.findById(id)
      if(!category)
        return res.status(400).json({error:"Internal Server Error"})
      res.status(200).json(category);
    }
    catch(err)
    {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }

  },

  //POST

  addCategory: async(req,res)=>{
    const{categoryName}=req.body;
  try{
    const newCategory=new Category({categoryName})
    await newCategory.save()
    res.status(200).json(newCategory)
  }
  catch(err)
  {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  },
  //PUT
  updateCategory: async(req,res)=>
  {
    try{
      const {id}=req.params
      const{categoryName}=req.body
      const category=await Category.findById(id)
      if(!category)
        return res.status(400).json({error:"not found"})
      category.categoryName=categoryName
      await category.save()
      res.status(200).json(category);
    }
     catch(err)
  {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  },
  //DELETE
  deleteCategory: async(req,res)=>{
    const {id}=req.params;
  try{
    await Category.findByIdAndUpdate(id,{status:'inactive'})
    const categories=await Category.find({});
    res.status(200).json({id});
  }
  catch(err)
  {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
}

export default  CatgoryController;