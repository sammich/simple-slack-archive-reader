import Users from './Users';
import Channels from './Channels';

import verbosity_report from './reports/verbosity-global';
import edits_report from './reports/edits';
import activity_report from './reports/time-of-day';

Channels.load();
verbosity_report();
edits_report();
activity_report();