import { connect } from 'mongoose';

import { uris, connectionOptions } from '../config/mongoose';

connect(uris, connectionOptions);
