const _ = require('lodash'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const results = []

    Channels.channels.forEach(ch => {
        ch.messages.forEach(m => {
            if (!m.text) return

            const searchDate = new Date(2015, 10, 5),
                dayRange = 3,
                startDate = new Date(searchDate),
                endDate = new Date(searchDate)

            startDate.setDate(searchDate.getDate() - dayRange)
            endDate.setDate(searchDate.getDate() + dayRange)

            if (m.when < startDate) return
            if (m.when > endDate) return
            if (m.user.name !== 'dofot9') return
            //if (!m.text.toLowerCase().includes('macbook')) return

            console.log(m.describe())
            results.push(m.describe())
        })
    })

    writeText('search-results', results)
}
