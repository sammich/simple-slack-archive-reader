require('./Users')
require('./Channels').load()

//require('./reports/download-attachments')()
require('./reports/edits')()
require('./reports/lexicon')()
require('./reports/message-count')()
require('./reports/message-growth')()
require('./reports/time-of-day')()
require('./reports/verbosity-global')()

//require('./reports/search')()
