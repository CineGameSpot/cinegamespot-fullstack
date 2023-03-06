const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comments");

module.exports = {
  getWriteReview: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("writeReview.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({post: req.params.id}).sort({ likes: "desc" }).populate('user').lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).populate('user').lean(); //Pull Comments for each DB item
      res.render("post.ejs", { post: post, user: req.user, comments: comments }); // send post ID, User and comments to EJS
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        brand: req.body.brand,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        //caption: req.body.caption,
/*         bottleInspection: req.body.bottleInspection,
        pourability: req.body.pourability,
        smell: req.body.smell,
        taste: req.body.taste, */
        heat: req.body.heat,
        thoughts: req.body.thoughts,
        rating: req.body.rating,
        /* purchase: req.body.purchase, */
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};
