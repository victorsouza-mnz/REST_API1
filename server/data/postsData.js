const database = require('../infra/database')


exports.getPosts = () => {
    return database.query('select * from blog.post')
}

exports.removePost = (id) => {
    return database.none('delete from blog.post where id = $1', [id])
}

exports.getPost = (id) => {
    return database.oneOrNone('select * from blog.post where id = $1', [id])
}

exports.getPostByTitle = (title) => {
    return database.oneOrNone('select * from blog.post where title = $1', [title])
}


exports.updatePost = function (id, post){
    return database.none('update blog.post set title = $1, content = $2 where id = $3', [post.title, post.content, id]);
}


exports.savePost = function (post){
    return database.one('insert into blog.post (title, content) values ($1, $2) returning *', [post.title, post.content]);
}
