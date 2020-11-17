const expect = require('chai').expect;

describe("Arithmetic Operation", () => {
    it('Addition', () => {
        const n1 = 2, n2 =3;
        expect(n1 + n2).to.equal(5);
    });
    it('Multiplication', () => {
        const n1 = 3, n2 =3;
        expect(n1 * n2).to.equal(9);
    });
})

describe("String Operation", () => {
    it('StartsWith', () => {
        const n1 = "hard", n2 ="hard work";
        expect(n2.startsWith(n1)).to.be.true;
    });
})