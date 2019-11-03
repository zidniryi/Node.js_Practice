const lib = require('../lib')
test('Absolute - should return + number if input is +', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
})

test('Absolute - should return + number if input is -', () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1)
})
test('Absolute - should return 0 number if input is 0', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
})