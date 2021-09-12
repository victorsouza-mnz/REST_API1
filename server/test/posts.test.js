const axios  = require('axios')
const crypto = require('crypto')
const postsService = require('../service/postsService')


const generate = () => {
    return crypto.randomBytes(20).toString('hex')
}

const request = (url, method, data) => {
    return axios ({ url, method, data, validateStatus: false})
}

test('Should get all posts', async () => {
    const post1 = await postsService.savePost({title: generate() , content: generate()})
    const post2 = await postsService.savePost({title: generate() , content: generate()})
    const post3 = await postsService.savePost({title: generate() , content: generate()})
    const response = await request('http://localhost:3000/posts', 'get')
    expect(response.status).toBe(200)
    const posts = response.data
    expect(posts[0].title).toBe(post1.title);
    expect(posts).toHaveLength(3)
    await postsService.removePost(post1.id)
    await postsService.removePost(post2.id)
    await postsService.removePost(post3.id)
})


test('Should save a post', async () => {
    const data = {title: generate() , content: generate()}
    const response = await request('http://localhost:3000/posts', 'post', data)
    expect(response.status).toBe(201)
    const post = response.data
    expect(post.title).toBe(data.title);
	expect(post.content).toBe(data.content);
    await postsService.removePost(post.id)
})

test('Should not save a post', async () => {
    const data = {title: generate() , content: generate()}
    const response1 = await request('http://localhost:3000/posts', 'post', data)
    const response2 = await request('http://localhost:3000/posts', 'post', data)
    expect(response2.status).toBe(409)
    const post = response1.data
    await postsService.removePost(post.id)
})

test('Should update a post', async () => {
    const post = await postsService.savePost({title: generate() , content: generate()})
    post.title = generate()
    post.content = generate()
    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)
    expect (response.status).toBe(204)
    const updatedPost = await postsService.getPost(post.id)
    expect(updatedPost.title).toBe(post.title);
	expect(updatedPost.content).toBe(post.content);
    await postsService.removePost(post.id)
})

test('Should not update a post', async () => {
    const post = {
        id: 1
    }
    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post)
    expect (response.status).toBe(404)
})


test('Should delete a post', async () => {
    const post = await postsService.savePost({title: generate() , content: generate()})
    await request(`http://localhost:3000/posts/${post.id}`, 'delete')
    const posts = await postsService.getPosts()
    expect(posts).toHaveLength(0)
})