// validate the string input
async function inputLimit(input) {
    if (input.trim() !== "" && input.trim().length <= 30) {
        return true;
    }
    return '\x1b[35m(Invalid input, please input 30 characters or less.)'
};

module.exports = inputLimit;