const express=require("express");
const blogRouter=express.Router();
const{blogModel}=require("../models/blog.model");
const { userModel } = require("../models/user.model");

//......get all blogs.........
blogRouter.get('/api/blogs', async (req, res) => {
    try {
      const blogs = await blogModel.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'something went wrong' });
    }
});

//.....create a blog........
blogRouter.post('/api/blogs', async (req, res) => {
    try {
      const { userId, title, content, category } = req.body;
      console.log(userId)

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }
      const user= await userModel.find({_id:userId});
     

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const username=user[0].username;
    
      const blog = new blogModel ({ username:username, title, content, category });
      await blog.save();
      res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
      res.status(500).json({ "msg": 'An error occurred' ,"err":error});
    }
});

//.......search by name........
blogRouter.get('/api/blogs', async (req, res) => {
    const { title } = req.query;
    console.log(title)
  
    try {
      const blogs = await blogModel.find({ title: { $regex: title, $options: 'i' } });
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
  });

  //..... filtr...
  blogRouter.get('/api/blogs', async (req, res) => {
    const {  category } = req.query;
       console.log(category)

    try {
      const blogs = await blogModel.find({category:category});
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
  });

module.exports={blogRouter}