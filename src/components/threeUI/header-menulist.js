var menuList;
export default menuList = [
    {
        name: '文件',
        ename: 'file',
        children: [
            {
                name: '导入',
                ename: 'import',
                children: [
                    {
                        name: '导入GLTF',
                        ename: 'importGLTF',
                        action: 'importGLTF',
                    },
                ],
            },
            {
                name: '导出',
                ename: 'export',
                children: [
                    {
                        name: '导出GLTF',
                        ename: 'exportGLTF',
                        action: 'exportGLTF',
                    },
                ],
            },
        ]
    },
    {
        name: '添加',
        ename: 'add',
        children: [
            {
                name: 'spoltlight',
                ename: 'spoltlight',
                action: 'addspolitlight'
            }
        ]
    }
]