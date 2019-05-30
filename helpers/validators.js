
module.exports = {
    
    error: (data) => {
        return {
            isValid: false,
            error: {
                status: 400,
                ...data
            }
        }
    },

    success: () => {
        return { isValid: true, error: null }
    },

}