const lib = require('../lib')
describe('absolute', () => {
    it('should return + number if input is +', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })

    it('should return + number if input is -', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    it('should return 0 number if input is 0', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
});

describe('greet', () => {
    it('should return the greeting messsage arguments ', () => {
        const result = lib.greet('Zidniryi')
        expect(result).toMatch(/Zidniryi/)
        expect(result).toContain('Zidniryi')

    });
});
