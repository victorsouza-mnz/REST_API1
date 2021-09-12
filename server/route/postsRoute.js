const express = require('express')
const router = express.Router()
const postsService = require('../service/postsService')


router.get('/posts', async (req, res) => {
    const posts = await postsService.getPosts()
    res.json(posts)
})

router.get('/posts/:id', async (req, res) => {
    res.end()
})

router.post('/posts', async (req, res) => {
    const post = req.body 
    const newPost = await postsService.savePost(req.body)
    res.status(201).json(newPost)
})

router.put('/posts/:id', async (req, res) => {
    const post = req.body
    try {
        await postsService.updatePost(req.params.id, post)
        res.status(204).end()
    } catch (e) {
        res.status(404).send(e.message)
    }
})


router.delete('/posts/:id', async (req, res) => {
    const id = req.params.id
    await postsService.removePost(id)
    res.status(204).end()
})


module.exports = router
