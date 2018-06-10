async function main() {
    return Promise.reject({
        message: 'xxxxx123'
    })
}

main().catch(err => {
    console.log('---___---', err);
})