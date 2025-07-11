const pool = require("../models/db");
const slugify = require("slugify");


const postBlog = async(req, res) => {
  const { username, email, title, content, category_id, tags } = req.body;
  console.log(req.body);

  try {
    // checking for existing user or not 
    let [users] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    let userId;
    if (users.length > 0){
      userId = users[0].id; // existing
    }
    else{
      // creating new user if not an existing
      const [result] = await pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
      userId = result.insertId;
    }
  
  
    // slug generation    
    const slug = slugify(title, { lower: true, strict: true });

    // insert into posts table
    let [postResult] = await pool.query(
      'INSERT INTO posts (title, slug, content, user_id, category_id) VALUES (?, ?, ?, ?, ?)',
      [title, slug, content, userId, category_id]               
    );
    const postId = postResult.insertId;
    

    // insert into posts_tag table
    for (let tagId of tags){
      await pool.query('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)', [postId, tagId])
    }
    res.status(201).json({ message: 'Blog created successfully', postId });
  } 
   catch (error) {
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}




const getBlogByTag = async(req, res) => {
    const { page = 1, tag = null } = req.query;
    const limit = 10  // 10 blogs per page
    const offset = (page-1) * limit;

    try {
    const [rows] = await pool.query(
      `
      SELECT 
        p.*, 
        u.username, 
        c.name AS category
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE (? IS NULL OR p.id IN (
        SELECT pt.post_id
        FROM post_tags pt
        JOIN tags t ON pt.tag_id = t.id
        WHERE t.name = ?
      ))
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [tag, tag, limit, offset]
    );


    res.status(200).json({
      // page: Number(page),
      tag: tag || null,
      posts: rows,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


const editBlogById = async() => {}


const getBlogById = async() => {}


const deleteBlogById = async() => {}


module.exports = {postBlog, getBlogByTag, editBlogById, getBlogById, deleteBlogById}