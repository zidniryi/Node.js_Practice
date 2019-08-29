console.log('Before')
getUser(1,  (user)=>{
    getRepo(user.gitUser, (repos) =>{
        console.log('Repos', repos)
    })
})

console.log('After')

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading data from db ...')
        callback({id: id, gitUser: 'zidniryi'})
        return
    }, 2000)

}

function getRepo(username, callback) {
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3'])

    }, 2000)
}