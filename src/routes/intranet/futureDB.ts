import type { Profile, Notification } from "./stores";

export type Post = {
    id: number,
    userId: string,
    date: string,
    content: string,
    img: string,
    parentPostID: number | undefined,
    likes:number,
    comments:number,
    visibility: string,
}


//data


export const postsDB: Post[] = [
    {visibility: 'all', likes: 0, comments: 6, userId:'1', parentPostID: undefined, id: 1, date: new Date().toISOString(), content: '‘THE LATE LATE SHOW WITH JAMES CORDEN’ has ended after 8 years.', img: "https://pbs.twimg.com/media/Fuy26UuWAAAu0Q5?format=jpg&name=large" },
    {visibility: '7328dcfd46803b6a', likes: 0, comments: 6, userId:'0', parentPostID: undefined, id: 0, date: new Date().toISOString(), content: "Vero totam modi nemo cumque optio. <br> https://clappforms.web.app", img:"" },
    {visibility: 'all', likes: 0, comments: 0, userId:'2', parentPostID: undefined, id: 2, date: new Date(2023, 3, 27, 6).toISOString(), img:"", content: "Quod nemo distinctio reprehenderit laboriosam accusamus iusto, dicta, dolore perspiciatis corporis dignissimos eos cum exercitationem deserunt? Deleniti, delectus quam? Vero non beatae labore eos esse quidem odit maxime doloremque culpa ducimus sit nemo quaerat a cupiditate ad velit nam qui laborum impedit neque, incidunt atque officia? <br><br> In optio officia accusantium, id doloremque aut laudantium doloribus magnam magni, dolorem, corrupti provident ut ab quidem eligendi eveniet neque quas vitae explicabo? Eius, aperiam natus laborum dolorem praesentium temporibus enim ducimus illum hic qui dicta aliquid, debitis facilis quidem ipsam voluptates! Odio officia nam laborum perspiciatis quidem cupiditate adipisci, incidunt natus dicta. <br><br> Deserunt veniam doloribus neque dolorum itaque obcaecati cum voluptatem sapiente nobis! Minus sunt tempora doloremque quos enim, quae dolorum, iste ex adipisci earum libero sint sequi culpa, inventore consectetur suscipit sed dignissimos cumque? Nisi quos nemo asperiores perferendis alias! <br><br> Voluptatem sunt, reprehenderit aperiam repellendus, officiis dolorum vel fugiat doloribus distinctio placeat corrupti eos hic repudiandae ipsum molestiae ullam ad tempore, iure ipsam nulla. Dolorum quod architecto illum neque. Explicabo quas alias voluptatum amet ad, quis recusandae id exercitationem impedit, beatae provident dolore obcaecati omnis quod placeat ipsam minus quasi. Reprehenderit placeat voluptatem illo." },
    {visibility: '7328dcfd46803b6a', likes: 0, comments: 0, userId:'3', parentPostID: undefined, id: 3, date: new Date(2023, 3, 21).toISOString(), img:"", content: "Ducimus debitis amet sint quis, ea maiores, eaque dolore veniam, est doloremque animi nostrum distinctio magni saepe labore suscipit temporibus quasi recusandae repellendus. Perferendis velit possimus natus numquam officia reprehenderit commodi facere quis, maxime explicabo quisquam libero harum obcaecati! Vitae, ad molestiae unde architecto voluptatem obcaecati non nam tempore corrupti ipsam ab aperiam temporibus exercitationem quaerat ullam quo. Provident itaque maiores ipsum iure unde atque inventore id repellendus, molestiae, nam officiis laboriosam rem fugit pariatur, commodi aperiam incidunt accusamus expedita nobis nemo eum? Doloremque omnis enim ipsam quod, consequatur voluptatibus ad! Eius, quibusdam. A necessitatibus at voluptatem error." },
    {visibility: 'all', likes: 0, comments: 0, userId:'4', parentPostID: undefined, id: 4,  date: new Date(2023, 3, 27, 13, 5).toISOString(), img:"", content: "Maxime delectus culpa voluptate unde aperiam reprehenderit nobis incidunt explicabo natus velit consequuntur, quas, hic tempora quam vero dolor ipsum impedit pariatur quisquam optio fugit nesciunt laboriosam eaque. Sit beatae accusantium eum earum quidem distinctio impedit voluptates esse odio facere laboriosam, omnis rem consequuntur cum porro officiis alias deserunt modi. Minus, pariatur?" },
    {visibility: 'all', likes: 0, comments: 0, userId:'5', parentPostID: undefined, id: 5, date: new Date(2023, 2, 27).toISOString(), img:"", content: "Nobis dicta accusantium ut natus fuga accusamus repellat nostrum voluptatem reiciendis explicabo voluptatibus nam incidunt quasi adipisci, similique consectetur, ipsum vel porro." },
    {visibility: 'all', likes: 0, comments: 0, userId:'0', parentPostID: undefined, id: 6, date: new Date(2022, 11, 29).toISOString(), img:"", content: "Itaque velit accusantium magni sequi, in excepturi provident dolorum est perspiciatis aperiam laboriosam eius, porro eaque saepe esse placeat amet cumque sit! Corrupti est fugit nobis quidem incidunt minima tempore ipsa dolorem nam impedit illum voluptas amet dolore aperiam quam unde, laboriosam ipsum ratione delectus! Qui nihil sapiente, explicabo maxime perspiciatis molestias fugiat architecto deserunt beatae minus ad quod autem dolore suscipit." },

    {visibility: 'all', likes: 0, comments: 0, userId:'0', parentPostID: 0, id: 14, date: new Date().toISOString(), content: '‘THE LATE LATE SHOW WITH JAMES CORDEN’ has ended after 8 years.', img: "https://pbs.twimg.com/media/Fuy26UuWAAAu0Q5?format=jpg&name=large" },
    {visibility: 'all', likes: 0, comments: 0, userId:'1', parentPostID: 0, id: 15, date: new Date(2023, 3, 27, 6).toISOString(), img:"", content: "Quod nemo distinctio reprehenderit laboriosam accusamus iusto, dicta, dolore perspiciatis corporis dignissimos eos cum exercitationem deserunt? Deleniti, delectus quam? Vero non beatae labore eos esse quidem odit maxime doloremque culpa ducimus sit nemo quaerat a cupiditate ad velit nam qui laborum impedit neque, incidunt atque officia? <br><br> In optio officia accusantium, id doloremque aut laudantium doloribus magnam magni, dolorem, corrupti provident ut ab quidem eligendi eveniet neque quas vitae explicabo? Eius, aperiam natus laborum dolorem praesentium temporibus enim ducimus illum hic qui dicta aliquid, debitis facilis quidem ipsam voluptates! Odio officia nam laborum perspiciatis quidem cupiditate adipisci, incidunt natus dicta. <br><br> Deserunt veniam doloribus neque dolorum itaque obcaecati cum voluptatem sapiente nobis! Minus sunt tempora doloremque quos enim, quae dolorum, iste ex adipisci earum libero sint sequi culpa, inventore consectetur suscipit sed dignissimos cumque? Nisi quos nemo asperiores perferendis alias! <br><br> Voluptatem sunt, reprehenderit aperiam repellendus, officiis dolorum vel fugiat doloribus distinctio placeat corrupti eos hic repudiandae ipsum molestiae ullam ad tempore, iure ipsam nulla. Dolorum quod architecto illum neque. Explicabo quas alias voluptatum amet ad, quis recusandae id exercitationem impedit, beatae provident dolore obcaecati omnis quod placeat ipsam minus quasi. Reprehenderit placeat voluptatem illo." },
    {visibility: 'all', likes: 0, comments: 0, userId:'2', parentPostID: 0, id: 16, date: new Date(2023, 3, 21).toISOString(), img:"", content: "Ducimus debitis amet sint quis, ea maiores, eaque dolore veniam, est doloremque animi nostrum distinctio magni saepe labore suscipit temporibus quasi recusandae repellendus. Perferendis velit possimus natus numquam officia reprehenderit commodi facere quis, maxime explicabo quisquam libero harum obcaecati! Vitae, ad molestiae unde architecto voluptatem obcaecati non nam tempore corrupti ipsam ab aperiam temporibus exercitationem quaerat ullam quo. Provident itaque maiores ipsum iure unde atque inventore id repellendus, molestiae, nam officiis laboriosam rem fugit pariatur, commodi aperiam incidunt accusamus expedita nobis nemo eum? Doloremque omnis enim ipsam quod, consequatur voluptatibus ad! Eius, quibusdam. A necessitatibus at voluptatem error." },
    {visibility: 'all', likes: 0, comments: 0, userId:'3', parentPostID: 0, id: 17,  date: new Date(2023, 3, 27, 13, 5).toISOString(), img:"", content: "Maxime delectus culpa voluptate unde aperiam reprehenderit nobis incidunt explicabo natus velit consequuntur, quas, hic tempora quam vero dolor ipsum impedit pariatur quisquam optio fugit nesciunt laboriosam eaque. Sit beatae accusantium eum earum quidem distinctio impedit voluptates esse odio facere laboriosam, omnis rem consequuntur cum porro officiis alias deserunt modi. Minus, pariatur?" },
    {visibility: 'all', likes: 0, comments: 0, userId:'4', parentPostID: 0, id: 18, date: new Date(2023, 2, 27).toISOString(), img:"", content: "Nobis dicta accusantium ut natus fuga accusamus repellat nostrum voluptatem reiciendis explicabo voluptatibus nam incidunt quasi adipisci, similique consectetur, ipsum vel porro." },
    {visibility: 'all', likes: 0, comments: 0, userId:'5', parentPostID: 0, id: 19, date: new Date(2022, 11, 29).toISOString(), img:"", content: "Itaque velit accusantium magni sequi, in excepturi provident dolorum est perspiciatis aperiam laboriosam eius, porro eaque saepe esse placeat amet cumque sit! Corrupti est fugit nobis quidem incidunt minima tempore ipsa dolorem nam impedit illum voluptas amet dolore aperiam quam unde, laboriosam ipsum ratione delectus! Qui nihil sapiente, explicabo maxime perspiciatis molestias fugiat architecto deserunt beatae minus ad quod autem dolore suscipit." },

    {visibility: 'all', likes: 0, comments: 0, userId:'0', parentPostID: 1, id: 7, date: new Date().toISOString(), content: "Vero totam modi nemo cumque optio. <br> https://clappforms.web.app", img:"" },
    {visibility: 'all', likes: 0, comments: 0, userId:'1', parentPostID: 1, id: 9, date: new Date(2023, 3, 27, 6).toISOString(), img:"", content: "Quod nemo distinctio reprehenderit laboriosam accusamus iusto, dicta, dolore perspiciatis corporis dignissimos eos cum exercitationem deserunt? Deleniti, delectus quam? Vero non beatae labore eos esse quidem odit maxime doloremque culpa ducimus sit nemo quaerat a cupiditate ad velit nam qui laborum impedit neque, incidunt atque officia? <br><br> In optio officia accusantium, id doloremque aut laudantium doloribus magnam magni, dolorem, corrupti provident ut ab quidem eligendi eveniet neque quas vitae explicabo? Eius, aperiam natus laborum dolorem praesentium temporibus enim ducimus illum hic qui dicta aliquid, debitis facilis quidem ipsam voluptates! Odio officia nam laborum perspiciatis quidem cupiditate adipisci, incidunt natus dicta. <br><br> Deserunt veniam doloribus neque dolorum itaque obcaecati cum voluptatem sapiente nobis! Minus sunt tempora doloremque quos enim, quae dolorum, iste ex adipisci earum libero sint sequi culpa, inventore consectetur suscipit sed dignissimos cumque? Nisi quos nemo asperiores perferendis alias! <br><br> Voluptatem sunt, reprehenderit aperiam repellendus, officiis dolorum vel fugiat doloribus distinctio placeat corrupti eos hic repudiandae ipsum molestiae ullam ad tempore, iure ipsam nulla. Dolorum quod architecto illum neque. Explicabo quas alias voluptatum amet ad, quis recusandae id exercitationem impedit, beatae provident dolore obcaecati omnis quod placeat ipsam minus quasi. Reprehenderit placeat voluptatem illo." },
    {visibility: 'all', likes: 0, comments: 0, userId:'2', parentPostID: 1, id: 10, date: new Date(2023, 3, 21).toISOString(), img:"", content: "Ducimus debitis amet sint quis, ea maiores, eaque dolore veniam, est doloremque animi nostrum distinctio magni saepe labore suscipit temporibus quasi recusandae repellendus. Perferendis velit possimus natus numquam officia reprehenderit commodi facere quis, maxime explicabo quisquam libero harum obcaecati! Vitae, ad molestiae unde architecto voluptatem obcaecati non nam tempore corrupti ipsam ab aperiam temporibus exercitationem quaerat ullam quo. Provident itaque maiores ipsum iure unde atque inventore id repellendus, molestiae, nam officiis laboriosam rem fugit pariatur, commodi aperiam incidunt accusamus expedita nobis nemo eum? Doloremque omnis enim ipsam quod, consequatur voluptatibus ad! Eius, quibusdam. A necessitatibus at voluptatem error." },
    {visibility: 'all', likes: 0, comments: 0, userId:'3', parentPostID: 1, id: 11,  date: new Date(2023, 3, 27, 13, 5).toISOString(), img:"", content: "Maxime delectus culpa voluptate unde aperiam reprehenderit nobis incidunt explicabo natus velit consequuntur, quas, hic tempora quam vero dolor ipsum impedit pariatur quisquam optio fugit nesciunt laboriosam eaque. Sit beatae accusantium eum earum quidem distinctio impedit voluptates esse odio facere laboriosam, omnis rem consequuntur cum porro officiis alias deserunt modi. Minus, pariatur?" },
    {visibility: 'all', likes: 0, comments: 0, userId:'4', parentPostID: 1, id: 12, date: new Date(2023, 2, 27).toISOString(), img:"", content: "Nobis dicta accusantium ut natus fuga accusamus repellat nostrum voluptatem reiciendis explicabo voluptatibus nam incidunt quasi adipisci, similique consectetur, ipsum vel porro." },
    {visibility: 'all', likes: 0, comments: 0, userId:'5', parentPostID: 1, id: 13, date: new Date(2022, 11, 29).toISOString(), img:"", content: "Itaque velit accusantium magni sequi, in excepturi provident dolorum est perspiciatis aperiam laboriosam eius, porro eaque saepe esse placeat amet cumque sit! Corrupti est fugit nobis quidem incidunt minima tempore ipsa dolorem nam impedit illum voluptas amet dolore aperiam quam unde, laboriosam ipsum ratione delectus! Qui nihil sapiente, explicabo maxime perspiciatis molestias fugiat architecto deserunt beatae minus ad quod autem dolore suscipit." },
];

export const profileDB: Profile[] = [
    {
        id: '0',
        fullName: 'Jamie Chen',
        department: 'Sales',
        jobTitle: 'President of Sales',
        mail: 'jamiechen@gmail.com',
        mobilePhone: '+1 (456) 152-4574',
        officeLocation: 'Towson',
        preferredLanguage: 'English',
        profilePicture: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        birthday: '02/29',
        notifications: []
    },
    {
        id: '1',
        fullName: 'Alex Patel',
        department: 'Front Desk',
        jobTitle: 'Receptionist',
        mail: 'alexpatel1@gmail.com',
        mobilePhone: '+1 (316) 152-4594',
        officeLocation: 'Florida',
        preferredLanguage: 'English',
        profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
        birthday: '05/15',
        notifications: []
    },
    {
        id: '2',
        fullName: 'Hanna Rodriguez',
        department: 'Marketing',
        jobTitle: 'Marketing Coordinator',
        mail: 'hannarodriguez@gmail.com',
        mobilePhone: '+1 (667) 152-4574',
        officeLocation: 'Towson',
        preferredLanguage: 'Español',
        profilePicture: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
        birthday: '12/01',
        notifications: []
    },
    {
        id: '3',
        fullName: 'Taylor Nguyen',
        department: 'Technology',
        jobTitle: 'Web Designer',
        mail: 'taylornguyen@gmail.com',
        mobilePhone: '+1 (667) 152-4511',
        officeLocation: 'Texas',
        preferredLanguage: 'English',
        profilePicture: 'https://media.istockphoto.com/id/1338767515/photo/proud-african-woman-smiling-profile-of-successful-businesswoman-in-red-suit-excited-touching.jpg?s=612x612&w=0&k=20&c=51pi7rGUJps8sfEWtNDfKVw3rHxE_qCNkEFcUXyZ9cI=',
        birthday: '01/30',
        notifications: []
    },
    {
        id: '4',
        fullName: 'Casey Lee',
        department: 'PMO',
        jobTitle: 'Project Manager',
        mail: 'casielee45@gmail.com',
        mobilePhone: '+1 (456) 111-4574',
        officeLocation: 'Santo Domingo',
        preferredLanguage: 'Español',
        profilePicture: 'https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture.jpg',
        birthday: '08/28',
        notifications: []
    },
    {
        id: '5',
        fullName: 'Sarah Singh',
        department: 'Sales',
        jobTitle: 'Account Executive',
        mail: 'sarahsingh@gmail.com',
        mobilePhone: '+1 (978) 152-4574',
        officeLocation: 'Silver Spring',
        preferredLanguage: 'Español',
        profilePicture: 'https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape.jpeg',
        birthday: '03/18',
        notifications: []
    },
]

export const notifications: Notification[] = [
    {
        id: '0',
        content: `Today is Sarah Singh's Birthday!`, 
        seen: true,
        dismissed: false,
        date: new Date(2022, 7, 10).toISOString(),
    },
    {
        id: '1',
        content: 'Monthly assessment reunion starts in 1 hour.', 
        seen: true,
        dismissed: false,
        date: new Date(2022, 9, 15).toISOString(),
    },
    {
        id: '2',
        content: `Today is Taylor Nguyen's Birthday!`, 
        seen: true,
        dismissed: false,
        date: new Date(2022, 11, 20).toISOString(),
    },
    {
        id: '3',
        content: 'New announcement: Project deadline extended.',
        seen: true,
        dismissed: false,
        date: new Date(2023, 0, 5).toISOString(),
    },
    {
        id: '4',
        content: 'Upcoming team meeting on Friday.',
        seen: true,
        dismissed: false,
        date: new Date(2023, 1, 28).toISOString(),
    },
    {
        id: '5',
        content: 'Important security update: Please update your passwords.',
        seen: true,
        dismissed: false,
        date: new Date(2023, 2, 10).toISOString(),
    },
    {
        id: '6',
        content: 'New feature release: Real-time collaboration.',
        seen: true,
        dismissed: false,
        date: new Date(2023, 3, 18).toISOString(),
    },
    {
        id: '7',
        content: 'Celebrating 1000 users milestone!',
        seen: true,
        dismissed: false,
        date: new Date(2023, 3, 15).toISOString(),
    },
    {
        id: '8',
        content: 'Holiday office closure: December 25th - January 1st.',
        seen: false,
        dismissed: false,
        date: new Date(2023, 2, 27).toISOString(),
    },
    {
        id: '9',
        content: 'Product roadmap update: New features planned for Q3.',
        seen: false,
        dismissed: false,
        date: new Date(2023, 4, 11).toISOString(),
    },
    {
        id: '10',
        content: 'Reminder: Submit your monthly reports by end of day.',
        seen: false,
        dismissed: false,
        date: new Date().toISOString(),
    },
];

