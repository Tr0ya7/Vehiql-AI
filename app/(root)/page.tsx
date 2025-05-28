import CarCard from "@/components/CarCard"
import HomeSearch from "@/components/HomeSearch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data"
import { SignedOut } from "@clerk/nextjs"
import { Calendar, Car, ChevronRight, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Home = ()  => (
    <div className="pt-20 flex flex-col">
        <section className="relative py-16 dotted-background md:py-28">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-5xl mb-4 gradient-title md:text-8xl">
                        Find your Dream Car with Vehiql AI
                    </h1>
                    <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                        advanced AI Car Search and test drive from thousands of vehicles.
                    </p>
                </div>
                <HomeSearch />
            </div>
        </section>
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                        Featured Cars
                    </h2>
                    <Button className="flex items-center" variant="ghost" asChild>
                        <Link href="/cars">
                            View All
                            <ChevronRight className="ml-1 size-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredCars.map((car) => <CarCard key={car.id} car={car} />)}
                </div>
            </div>
        </section>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                        Browse by Make
                    </h2>
                    <Button className="flex items-center" variant="ghost" asChild>
                        <Link href="/cars">
                            View All
                            <ChevronRight className="ml-1 size-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {carMakes.map((make) => 
                        <Link key={make.name} className="bg-white rounded-lg shadow p-4 text-center transition cursor-pointer hover:shadow-md" href={`/cars?make=${make.name}`}>
                            <div className="w-auto h-16 mx-auto mb-2 relative">
                                <Image src={make.image} alt={make.name} fill style={{ objectFit: "contain" }} />
                            </div>
                            <h3 className="font-medium">
                                {make.name}
                            </h3>
                        </Link>
                    )}
                </div>
            </div>
        </section>
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-12">
                    Why Choose Our Platform
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="text-center">
                        <div className="bg=blue-100 text-blue-700 rounded-full size-16 flex justify-center items-center mx-auto mb-4">
                            <Car className="size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Wide Selection
                        </h3>
                        <p className="text-gray-600">
                            Thousands of verified vehicles from trusted dearlerships and private sellers.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg=blue-100 text-blue-700 rounded-full size-16 flex justify-center items-center mx-auto mb-4">
                            <Calendar className="size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Easy Test Drive
                        </h3>
                        <p className="text-gray-600">
                            Book a test drive online in minutes, with flexible scheduling options.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 text-blue-700 rounded-full size-16 flex justify-center items-center mx-auto mb-4">
                            <Shield className="size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Secure Process
                        </h3>
                        <p className="text-gray-600">
                            Verified listings and secure booking process for peace of mind.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                        Browse by Body Type
                    </h2>
                    <Button className="flex items-center" variant="ghost" asChild>
                        <Link href="/cars">
                            View All
                            <ChevronRight className="ml-1 size-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {bodyTypes.map((type) => 
                        <Link key={type.name} className="relative group cursor-pointer" href={`/cars?bodyType=${type.name}`}>
                            <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                                <Image className="object-cover transition duration-300 group-hover:scale-105" src={type.image} alt={type.name} fill />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                                <h3 className="text-white text-xl font-bold pl-4 pb-2">
                                    {type.name}
                                </h3>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </section>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <Accordion className="w-full" type="single" collapsible>
                    {faqItems.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        <section className="py-16 dotted-background text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Find Your Dream Car?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of satisfied customers who found their perfect vehicle through our platform.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/cars">
                            View All Cars
                        </Link>
                    </Button>
                    <SignedOut>
                        <Button size="lg" asChild>
                            <Link href="/sign-up">
                                Sign Up Now
                            </Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </section>
    </div>
)

export default Home