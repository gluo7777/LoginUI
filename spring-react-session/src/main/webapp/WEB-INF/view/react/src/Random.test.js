const app = { obj: { name: 'william' } };
const setObj = newObj => app.obj = newObj;
const setField = (key, val) => setObj({ ...app.obj, [key]: val })
console.log({ app })
setObj({ ...app.obj, last: 'luo' })
console.log({ app })
setField('name', 'William')
setField('age', 24)
console.log({ app })
console.log({ ...app })
console.log([...[1, 2, 3, 4]])
console.log({ first: 'william', last: 'xxx', ['last']: 'luo' })

const f1 = (arg1, arg2, arg3) => arg1 + arg2 + arg3;
console.log(f1('1', 2))
console.log(f1(1, '2'))
console.log(f1(1, 2, 3))
var args = [1, 2, 3]
console.log(f1(...args))
args = [1, 2]
console.log(f1(...args, 3))