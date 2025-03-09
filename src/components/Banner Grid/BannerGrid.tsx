
const BannerGrid = () => {
    return (<>
        <section className="container py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dwtbzhlph/image/upload/v1741512280/jfljsz37k5tdtmlrbvsi.png" alt="Promotion 1" className="object-cover h-full w-full" />

                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dwtbzhlph/image/upload/v1741512976/teg5pigtr0sgyfysq6sw.png" alt="Promotion 2" className="object-cover h-full w-full" />

                </div>
            </div>
        </section></>)
}
export default BannerGrid