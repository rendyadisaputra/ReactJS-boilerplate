import React from 'react';

import * as moment from 'moment';

export default function DatePicker(props) {
  return (
    <div>
      <input
        {...props}
        id="date-picker"
        type="date"
        className="text-input text-input__date"
        min="1900-01-01"
        max={moment().format('YYYY-MM-DD')}
      />
    </div>
  );
}
