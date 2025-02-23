import * as pages from '../constants/pages';

import AppLayout from '../layouts/AppLayout';

import SettledMatchCountRoute from './SettledMatchCountRoute';

export default [
    {
        Id: pages.SETTLED_MATCH_COUNT,
        Path: 'SettledMatchCountReport/*',
        Layout: AppLayout,
        Component: SettledMatchCountRoute,
    }
];
