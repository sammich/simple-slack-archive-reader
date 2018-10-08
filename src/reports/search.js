const _ = require('lodash'),
    { writeText } = require('../utils'),
    Channels = require('../Channels')

module.exports = function run() {
    const results = []

    Channels.channels.map(ch => {
        ch.messages.forEach(m => {
            if (!m.text) return
            
            const searchDate = new Date(2016, 2, 6),
                dayRange = 3,
                startDate = new Date(searchDate),
                endDate = new Date(searchDate)
            
            startDate.setDate(searchDate.getDate() - dayRange)
            endDate.setDate(searchDate.getDate() + dayRange)
            
            if (m.when < startDate) return
            if (m.when > endDate) return
            
            if (!m.text.toLowerCase().includes('macbook')) return
            
            results.push(m.describe())
        })
    })
    
    writeText('search-results', results)
}
