import ImageRevealGallery from './image-gallery'

const galleryData = [
    {
        title: "PIXEL 10 SERIES",
        content:
            "Skins, cases and glass: available now.",
        image: "/public/images/pixel-10.jpg",
        button: "Take a look"
    },
    {
        title: "WHITE DAMASCUS",
        content: "An RGB  twist on an all-time classic",
        image: "/public/images/white-damascus.jpg",
        button: 'take the rainbow'
    },
    {
        title: "SWITCH 2 KIllSWITCH",
        content: "Now featuring all-new Joy-Lock Grips.",
        image: "/public/images/switch-2.jpg",
        button: "secure yours"
    },
    {
        title: "Tank Case",
        content: "Launching September, exclusively for the iphone 17 series.",
        image: "/public/images/Tank-case.jpg",
        button: 'get notified'
    }, {
        title: "Prism 2.0",
        content: "The Idiot-proof Screen Protector.",
        image: "/public/images/prism.jpg",
        button: "shop now"
    },
    {
        title: "Ghost 2.0",
        content: "The next gen clear case",
        image: "/public/images/iphone16-case.jpg",
        button: 'Buy now'
    },
    {
        title: "Project Killswitch",
        content: "The ultimate handheld gaming case.",
        image: "/public/images/killswitch.jpg",
        button: "get yours"
    },
    {
        title: "Circuit board",
        content: "Yes - it glows in the dark",
        image: "/public/images/circuit-board.jpg",
        button: "Glow now"
    },
    {
        title: "Galaxy S25 Series",
        content: "MagSafe included. Checkmate, Tim.",
        image: "/public/images/galaxy-25.jpg",
        button: "Get yours"
    },
]

export default function DBrand() {
    return (
        <main>
            <ImageRevealGallery sections={galleryData} />
        </main>
    )
}
