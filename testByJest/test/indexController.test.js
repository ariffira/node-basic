const indexController = require('../controller/indexController');

// first Test case suite
test('test01: test summation result', ()=> {
    expect(indexController.sum(1,2)).toBe(3);
    expect(indexController.sum(2,4)).toBeNumber();
});

// test 02
test('test 02: My get data function test', ()=> {
    expect(indexController.getMyData()).toBeString();
});