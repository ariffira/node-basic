exports.getMyData = ()=> {
    let name = 'Arif';
    let age = 32;
    return 'My Name '+ name + ' and I am '+ age + ' years old'
} 

const sum = (a, b)=> {
    return a + b;
}
module.exports.sum = sum;