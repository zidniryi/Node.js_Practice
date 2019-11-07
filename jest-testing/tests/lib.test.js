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

describe('Get Currencies', () => {
    it('should', () => {
        const result = lib.getCurrencies()

        // too general
        expect(result).toBeDefined()
        expect(result).not.toBeNull()

        // To Specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('AUD')
        expect(result[2]).toBe('IDR')
        expect(result.length).toBe(3)

        // Proper way
        expect(result).toContain('IDR')
        expect(result).toContain('AUD')
        expect(result).toContain('USD')

        // Ideal way 
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'IDR']))
    })
});
// Don't to specific

describe('Get Product', () => {
    it('should return objecct product', () => {
        const result = lib.getProduct(1)
        // expect(result).toEqual({ id: 1, price: 10 })
        expect(result).toMatchObject({ id: 1, price: 10 })
        expect(result).toHaveProperty('id', 1)
    });
})

describe('Register User', () => {
    it('should throw erro if user falsy ', () => {
        // null, false, nan etc
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach((a) => {
            expect(() => {
                lib.registerUser(a)
            }).toThrow()
        })
    });

    it('should return object if user valid', () => {
        const result = lib.registerUser('Zidniryi')
        expect(result).toMatchObject({ username: 'Zidniryi' })
        expect(result.id).toBeGreaterThan(0)
    });
});