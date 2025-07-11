import React, { useState } from 'react';
import api_url from '../ipconfig';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateBlog = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAddBlog = async () => {
    console.log(tags)
    try {
      const response = await fetch(`${api_url}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          title,
          content,
          category_id: categoryId,
          tags
        }),
      });

      const data = await response.json();
      console.log('Blog created:', data);
      handleClose();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ➕ Create Blog
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
               <option value="">Select a category</option>
               <option value="1">Frontend</option>
               <option value="2">Backend</option>
               <option value="3">DevOps</option>
               <option value="4">AI</option>
              </Form.Select> 
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Select
                    multiple
                    value={tags}
                    onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
                        setTags(selected);
                    }}
                >
               <option value="1">React</option>
               <option value="2">Node.js</option>
               <option value="3">Express</option>
               <option value="4">Docker</option>
               <option value="5">API</option>
              </Form.Select>
              <Form.Text className="text-muted">
                  Hold <strong>Ctrl</strong> (or <strong>Cmd</strong> on Mac) to select multiple tags.
              </Form.Text>

              <div className="mt-2 text-sm text-muted">
                    Selected: {tags.length > 0 ? tags.join(', ') : 'None'}
               </div>

            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Add Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateBlog;