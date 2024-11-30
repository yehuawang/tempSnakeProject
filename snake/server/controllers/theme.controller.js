import Theme from '../models/theme.model.js'



/**
 * 
 * @param {} req GET method 
 * @param {*} res 
 */
export const getAllThemes = async (req, res) => {
    try {
        const response = await Theme.find()
        const themes = response.map(theme => {
            return {
                name: theme.name,
                colors: theme.colors,
                price: theme.price
            }
        })
        res.status(200).json(themes)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving themes"
        })
    }
}



/**
 * 
 * @param {'themeName: String'} req 
 * @param {*} res 
 */
export const getTheme = async (req, res) => {
    const { themeName } = req.body
    try {
        const response = await Theme.findOne({name: themeName})
        const theme = {
            name: response.name,
            colors: response.colors,
            price: response.price
        }
        res.status(200).json(theme)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving theme"
        })
    }
}


/**
 * 
 * @param {name: String, colors: {primary: hex, secondary: hex, accent: hex}, price: Number} req 
 * @param {*} res 
 */
export const addTheme = async (req, res) => {
    const { name, colors, price } = req.body
    const newTheme = new Theme({
        name: name,
        colors: colors,
        price: price
    })
    try {
        await newTheme.save()
        res.status(200).json({
            message: "Theme added successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when adding theme"
        })
    }
}