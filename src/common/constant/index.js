
export const MENUS = [
    {
        key: 'homepage',
        icon: 'home',
        label: 'Home'
    },
    {
        key: 'case/add',
        icon: 'search',
        label: 'Query'
    },
    {
        key: 'example',
        icon: 'paper-clip',
        label: 'Example'
    },
    {
        key: 'statistics',
        icon: 'bar-chart',
        label: 'Statistics'
    },
    {
        key: 'faq',
        icon: 'question',
        label: 'Help',
    }

];

export const ROUTER_PATHS = {
    LOGIN: '/login',
    PGI_HOME_PAGE: '/homepage',
    PGI_CASE_ADD: '/case/add',
    PGI_CASE_STATUS: '/case/status/:caseid',
    PGI_CASE_REPORT: '/case/report/:caseid',
    PGI_CASE_DETAILS: '/case/details',
    PGI_CASE_DRDETAILS: '/case/drdetails',
    PGI_CASE_IEDETAILS: '/case/iedetails',
    PGI_STATISTICS: '/statistics',
    PGI_FAQ: '/faq',
    PGI_EXAMPLE: '/example',
    PGI_CASE_EXPBP: '/case/expbp'
};

export const FOOTER = {
    text: '© 2022 - PreMedKB-POI - Fudan PGx'
};

export const PAGINATION = {
    current: 1,
    pageSize: 50,
    total: 0,
    showTotal: total => `total ${total} item${total > 1 ? 's' : ''}`,
};

export const WGT_RNG = [0, 5];

export const WORD_CLOUD_SIZE = 128;

export const FILE_VIRTUAL_PATH = '/PGxZone/home/pgx/app1SrcData';
export const FILE_REALITY_PATH = '/mnt/srcDataResc/home/pgx/app1SrcData/';

const CACHE_PREFIX = 'pgi-';

export const CACHE_TOKEN = CACHE_PREFIX + 'token';

export const CACHE_USER = CACHE_PREFIX + 'user';
