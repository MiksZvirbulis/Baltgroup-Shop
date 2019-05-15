export const isValid = (value, rules) => {
    let isValid = true
    let invalidMessages = []

    if (rules.minChars && (value.length < rules.minChars)) {
        isValid = false
        invalidMessages.push(`Rakstu zīmēm jāsasniedz vismaz ${rules.minChars}`)
    }

    if (rules.maxChars && (value.length > rules.maxChars)) {
        isValid = false
        invalidMessages.push(`Rakstu zīmes nedrīkst pārsniegt ${rules.maxChars}`)
    }

    return { isValid, messages: invalidMessages }
}