const p = new Promise((resolve, reject) =>{
    setTimeout(() => {
        // Pending
        // reject(new Error('message'))
        resolve(12)
    }, 2000);
})
// Result || Error
p.then(result =>  console.log('Result', result))
.catch(err => console.log('Error', err.message))