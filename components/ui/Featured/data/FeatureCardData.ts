export interface Content {
  link: string
  imgSrc: string
  imgalt: string
  imgWidth: number
  imgHeight: number
  Title: string
  Author: string
  authorimgURL?: string
  Date: string
  Content: string
  Likes: number
  Comments: number
}

export const mainContent: Content = {
    link: "/",
    imgSrc: "/test.webp",
    imgalt: "test",
    imgWidth: 600,
    imgHeight: 600,
    Title: "Gaimin Gladiators Officially File Lawsuit Against Dota Team",
    Author: "Azis Agantal",
    authorimgURL: "url('https://lh3.googleusercontent.com/a/ACg8ocK70FAg1dYHI9ITGOTa9czh9PinJTIGZeatig06g2LkDUDACLE_=s96-c')",
    Date: "5/10/2025",
    Content: "Following a very public dispute that saw them withdraw their Dota squad from the prestigious The International tournament for 2025. The initial claim, which is likely to lroem impsunm word yes to from",
    Likes: 8,
    Comments: 46
}

export const subContents: Content[] = [
    {
        link: "/",
        imgSrc: "/test2.jpg",
        imgalt: "test2",
        imgWidth: 200,
        imgHeight: 300,
        Title: "Belly Of The Beast Episode 76 How to be a Proxy Belly Of The Beast",
        Author: "Azis Agantal",
        Date: "5/10/2025",
        Content: "The news of Ricky Hatton’s passing came through on the 14th September. Reports stated there was reports stated there was nothing",
        Likes: 5,
        Comments: 12
    },
    {
        link: "/",
        imgSrc: "/test2.jpg",
        imgalt: "test3",
        imgWidth: 200,
        imgHeight: 300,
        Title: "Belly Of The Beast Episode 76",
        Author: "Azis Agantal",
        Date: "5/10/2025",
        Content: "The news of Ricky Hatton’s passing came through on the 14th September. Reports stated there was nothing suspicious",
        Likes: 8,
        Comments: 23
    }
]