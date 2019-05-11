export const isValid = (value, rules) => {
    let isValid = true

    if (rules.minChars && (value.length <= rules.minChars)) {
        isValid = false
    }

    if (rules.maxChars && (value.length > rules.maxChars)) {
        isValid = false
    }

    return isValid
}