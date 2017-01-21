/*
 * The albums reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function () {
    return [
        {
            id: 1,
            title: "The Life Of Pablo",
            tracksNum: 300,
            thumbnail: "/public/images/pablo.jpeg"
        },
        {
            id: 2,
            title: "My Beautiful Dark Twisted Fantasy",
            tracksNum: 12,
            thumbnail: "/public/images/mbdtf.jpeg"
        },
        {
            id: 3,
            title: "Yeezus",
            tracksNum: 15,
            thumbnail: "/public/images/yeezus.jpeg"
        }
    ]
}