/*
Outputs three columns: date, messages sent that day, cumulative messages
 */

import * as moment from 'moment';
import Channels from '../Channels'

export default function run() {
    const data = new Map<string, number>();

    Channels.channels.map((ch) => {
        ch.messages.map((m) => {
            if (!m.user) return;

            const date = moment(m.when).format('YYYY-MM-DD');
            if (!data.has(date)) {
                data.set(date, 0);
            }

            let curr = data.get(date);
            if (curr !== undefined) {
                data.set(date, ++curr);
            } else {
                console.log('no curr');
            }
        });
    });

    const output = [];
    data.forEach((count, datetime) => {
        output.push([datetime, count]);
    });

    output.sort((a, b) => {
        return a[0] - b[0];
    });

    output.forEach(row => {
        console.log(`${row[0]}\t${row[1]}`);
    });
}
