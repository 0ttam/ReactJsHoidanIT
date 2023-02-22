export const adminMenu = [
    {
        // Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                // Quản lý CRUD
                name: 'menu.admin.crud',
                link: '/system/user-manage',
            },
            {
                // Quản lý CRUD
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },
            {
                // Quản lý bác sĩ
                name: 'menu.admin.manage-doctor',
                link: '/system/user-doctor',
            },
            {
                // Quản lý admin
                name: 'menu.admin.manage-admin',
                link: '/system/user-admin',
            },
        ],

        // menus: [
        //     {
        //         name: 'menu.admin.manage-doctor',
        //         // subMenus: [
        //         //     {
        //         //         name: 'menu.system.system-administrator.user-manage',
        //         //         link: '/system/user-manage',
        //         //     },
        //         //     {
        //         //         name: 'menu.system.system-administrator.user-redux',
        //         //         link: '/system/user-redux',
        //         //     },
        //         // ],
        //     },
        //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        // ],
    },
    {
        //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ],
    },
    {
        //Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ],
    },
    {
        //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
        ],
    },
];
