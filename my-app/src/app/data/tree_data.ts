// tree-data.ts
export const TREE_DATA = [
    {
        name: 'Root 1',
        children: [
            { name: 'Child 1.1' },
            {
                name: 'Child 1.2',
                children: [
                    { name: 'Grandchild 1.2.1' },
                    { name: 'Grandchild 1.2.2' },
                ]
            }
        ]
    },
    {
        name: 'Root 2',
        children: [
            { name: 'Child 2.1' },
            { name: 'Child 2.2' }
        ]
    }
];
