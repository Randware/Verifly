class Placeholder {
    static mapping = {
            "${verification_code}" : /\$\{verification_code\}/,
            "${emailTo}" : /\$\{emailTo\}/,
            "${emailFrom}" : /\$\{emailFrom\}/,
            "${display_name}" : /\$\{display_name\}/, //TOFIX Add diaply_name variable
    }

    static mapPlaceholders(text, ...replacementString) {
        if (typeof text === "string") {
            Object.keys(this.mapping).forEach(key => {
                text = text.replace(this.mapping[key], replacementString.shift());
            })
            
        }
        return text;
    }
}

module.exports = Placeholder;