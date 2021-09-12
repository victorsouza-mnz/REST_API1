const postsData = require('../data/postsData')

exports.getPosts = () => {
    return postsData.getPosts()
}
 
exports.savePost = async (post) => {
    const existingPost = await postsData.getPostByTitle(post.title)
    if (existingPost) throw new Error ('Post alread exists')
    return postsData.savePost(post)
}

exports.removePost = (id) => {
    return postsData.removePost(id)
}

exports.getPost = async (id) => {
    const post = await postsData.getPost(id)
    if (!post) throw new Error('Post not found')
    return post
}

exports.updatePost = async (id, post) => {
    await exports.getPost(id)
    return postsData.updatePost(id, post)
}
