"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "./ui/input"
import { Camera, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import Image from "next/image"
// import useFetch from "@/hooks/use-fetch"
import { useRouter } from "next/navigation"

interface AcceptFiles { path: string, relativePath: string, lastModified: number, lastModifiedDate: object, name: string, size: number, type: "image/jpeg" | "image/jpg" | "image/png", webkitRelativePath: string }

const HomeSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isImageSearchActive, setIsImageSearchActive] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [searchImage, setSearchImage] = useState<AcceptFiles | null>(null)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    // const { loading: isProcessing, fn: processImageFn, data: processResult, error: processError } = useFetch(processImageSearch)
    
    const router = useRouter()

    const handleTextSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!searchTerm.trim()) {
            toast.error("Please upload an image first")
            return
        }

        router.push(`/cars?search=${encodeURIComponent(searchTerm)}`)
    }
    
    const handleImageSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!searchImage) {
            toast.error("Please upload an image first")
            return
        }
    }

    const onDrop = (acceptFiles: Array<AcceptFiles>) => {
        const file = acceptFiles[0]

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size must be less than 5MB")
                return
            }

            setIsUploading(true)
            setSearchImage(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
                setIsUploading(false)
                toast.success("Image uploaded sucessfully")
            }

            reader.onerror = () => {
                setIsUploading(false)
                toast.error("Failed to read the image")
            }

            reader.readAsDataURL(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({onDrop, accept: { "image/*": [".jpeg", ".jpg", ".png"] }, maxFiles: 1})
    
    return (
        <div>
            <form onSubmit={handleTextSubmit}>
                <div className="relative flex items-center">
                    <Input 
                        className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm" 
                        type="text" 
                        value={searchTerm}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                        placeholder="Enter make, model, or use our AI Image Search..." 
                    />
                    <div className="absolute right-[100px]">
                        <Camera className={cn("cursor-pointer rounded-xl p-1.5", isImageSearchActive ? "bg-black color-white" : "")} size="35" onClick={() => setIsImageSearchActive(!isImageSearchActive)} />
                    </div>
                    <Button className="absolute right-2 rounded-full" type="submit">
                        Search
                    </Button>
                </div>
            </form>
            {isImageSearchActive && 
                <div className="mt-4">
                    <form onSubmit={handleImageSearch}>
                        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
                            {imagePreview 
                                ?
                                    <div className="flex flex-col items-center">
                                        <Image className="object-contain mb-4" width="160" height="160" src={imagePreview} alt="Car preview" />
                                        <Button 
                                            variant="outline" 
                                            onClick={() => { 
                                                setSearchImage(null) 
                                                setImagePreview("")
                                                toast.info("Image removed")
                                            }}
                                        >
                                            Remove Image
                                        </Button>
                                    </div> 
                                :
                                <div {...getRootProps()} className="cursor-pointer">
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center">
                                        <Upload className="size-12 text-gray-400 mb-2" />
                                        <p className="text-gray-500 mb-2">
                                            {isDragActive && !isDragReject ? "Leave the file here to upload" : "Drag & drop a car image or click to select"}
                                        </p>
                                        {isDragReject && <p className="text-red-500 mb-2">Invalid image type</p>}
                                        <p className="text-gray-400 text-sm">
                                            Supports: JPG, PNG (max 5MB)
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                        {imagePreview && <Button className="w-full mt-2" type="submit" disabled={isUploading}>{isUploading ? "Uploading..." : "Search with this image"}</Button>}
                    </form>
                </div>
            }
        </div>
    )
}

export default HomeSearch