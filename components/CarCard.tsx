"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { CarIcon, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { MouseEventHandler, useState } from "react"
import { Badge } from "./ui/badge"
import { useRouter } from "next/navigation"

const CarCard = ({ car }: { car: Car }) => {
    const [isSaved, setIsSaved] = useState<boolean>(car.wishlisted)
    const router = useRouter()

    const handleToggleSave = async (event: MouseEventHandler<HTMLButtonElement>) => {}

    return (
        <Card className="overflow-hidden transition group hover:shadow-lg py-0">
            <div className="relative h-48">
                { car.images && car.images.length > 0 ?
                    <div className="relative size-full"><Image className="object-cover transition duration-300 group-hover:scale-105" src={ car.images[0] } alt={`${ car.make } ${ car.model }`} fill /></div> : 
                    <div className="size-full bg-gray-200 flex justify-center items-center"><CarIcon className="size-12 text-gray-400" /></div>
                }
                <Button 
                    className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${isSaved ? "text-red-500 hover:text-red-600" : "text-gray-600 hover:text-gray-900"}`} 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleToggleSave}
                >
                    <Heart className={isSaved ? "fill-current" : ""} size={20} />
                </Button>
            </div>
            <CardContent className="p-4">
                <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-bold line-clamp-1">
                        { car.make }
                        { car.model }
                    </h3>
                    <span className="text-xl font-bold text-blue-600">
                        ${ car.price.toLocaleString() }
                    </span>
                </div>
                <div className="text-gray-600 mb-2 flex items-center">
                    <span>
                        { car.year }
                    </span>
                    <span className="mx-2">
                        •
                    </span>
                    <span>
                        { car.transmission }
                    </span>
                    <span className="mx-2">
                        •
                    </span>
                    <span>
                        { car.fuelType }
                    </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                    <Badge className="bg-gray-50" variant="outline">
                        { car.bodyType }
                    </Badge>
                    <Badge className="bg-gray-50" variant="outline">
                        { car.mileage.toLocaleString() } miles
                    </Badge>
                    <Badge className="bg-gray-50" variant="outline">
                        { car.color }
                    </Badge>
                </div>
                <div className="flex justify-between">
                    <Button className="flex-1" onClick={() => router.push(`/cars/${ car.id }`)}>
                        View Car
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CarCard