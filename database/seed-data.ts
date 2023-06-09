
interface seedData {
    entries: seedEntry[];
}

interface seedEntry {
    title: string;
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: seedData = {
    entries: [
        {
            title: 'Entries',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            title: 'Entries',
            description: 'Mollit et ut ea ullamco aliquip adipisicing Lorem culpa sint veniam cupidatat quis ipsum.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            title: 'Entries',
            description: 'Aliqua id et commodo in ut in laboris fugiat do ad consectetur cillum velit id.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}