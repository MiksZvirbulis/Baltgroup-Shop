import { isValid } from './isValid'

it("string: 'te' should have min of 3 chars, should return false", () => {
    expect(isValid("te", { minChars: 3 } )).toEqual(false)
})

it("string: 'tests' should have max of 4 chars, should return false", () => {
    expect(isValid("tests", { maxChars: 4 } )).toEqual(false)
})

it("string: 'test' should have min of 2 chars, should return true", () => {
    expect(isValid("test", { minChars: 2 } )).toEqual(true)
})

it("string: 'test' should have max of 4 chars, should return true", () => {
    expect(isValid("test", { maxChars: 4 } )).toEqual(true)
})