const courseData=[
    {
      course: 'Core Java',
      imageUrl: '../assets/images/java.jpg',
      id: 1,
      desc: 'Java',
      hourlyRate:14,
      subSections:[{
          id:1,
          sectionId:1,
          title:'Java Variables',
          desc:'Java Beginner'
      },
      {
        id:2,
        sectionId:1,
        title:'Java Variables',
        desc:'Java Variables'
    }

      ]
    },
    {
      course: 'SpringBoot with JPA',
      imageUrl: '../assets/images/oracle.png',
      id: 2,
      desc: 'SpringBoot with JPA',
      hourlyRate:14,
      subSections:[{
        id:1,
        sectionId:2,
        title:'SpringBoot with JPA and mySql',
        desc:'SpringBoot with JPA and mysql'
    },
    {
      id:2,
      sectionId:2,
      name:'SpringBoot with JPA and mysql details',
      desc:'SpringBoot with JPA and mysql details'
  }

    ]
    },
    {
      course: 'SpringBoot with Document Databases',
      imageUrl: '../assets/images/java.jpg',
      id: 3,
      desc: 'SpringBoot with Document Databases',
      hourlyRate:14,
      subSections:[{
        id:1,
        sectionId:3,
        title:'SpringBoot with MongoDb',
        desc:'SpringBoot with MongoDB details'
    },
    {
      id:2,
      sectionId:3,
      title:'SpringBoot with MongoDB theory',
      desc:'SpringBoot with MongoDB theory'
  }
]
    },
    {
      course: 'SPA technologies',
      imageUrl: '../assets/images/oracle.png',
      size: 'large',
      id: 4,
      desc: 'SPA',
      hourlyRate:14,
      subSections:[{
        id:1,
        sectionId:4,
        title:'ReactJs fundamentals',
        desc:'ReactJs fundamentals'
    },
    {
      id:2,
      sectionId:4,
      name:'ReactJs lifecycle',
      desc:'Reactjs lifecucle'
  }
]
    },
    {
      course: 'NodeJs',
      imageUrl: '../assets/images/oracle.png',
      size: 'large',
      id: 5,
      desc: 'NodeJs',
      hourlyRate:14,
      subSections:[{
        id:1,
        sectionId:5,
        name:'NodeJs with MongoDb',
        desc:'NodeJs with MongoDb'
    },
    {
      id:2,
      sectionId:5,
      name:'NodeJs with MongoDB details',
      desc:'NodeJs with MongoDB details'
  }
]
    }
  ];

  export default courseData