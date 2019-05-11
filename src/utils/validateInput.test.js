import { validateInput } from './validateInput'

it("should return false", () => {
    expect(validateInput("te", { rules: { minChars: 3 }} )).toEqual(false)
})

it("should return false", () => {
    expect(validateInput("te", { rules: { maxChars: 4 }} )).toEqual(true)
})