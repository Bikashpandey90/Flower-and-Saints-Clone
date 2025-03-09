import { useController } from "react-hook-form"
import { useState } from "react"

interface LabelProps {
    htmlFor: string,
    children: any
}
export const InputLabel = ({ htmlFor, children }: LabelProps) => {

    return (<>
        <label className="text-sm font-medium" htmlFor={htmlFor}>
            {children}
        </label>

    </>)
}
export enum InputType {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
    DATE = 'date',
    URL = 'url',
    TEL = 'tel',
    FILE = 'file',
    NUMBER = 'number'
}
export interface TextInputFieldProps {
    control: any,
    name: string,
    errMsg: string,
    type?: InputType,
    placeholder?: string,
    className?: string,


}
export interface TextAreaFieldProps {
    name: string,
    control: any,
    defaultValue?: string,
    errMsg?: string,
    placeholder?: string,


}



export const TextInputField = ({ control, errMsg, name, type = InputType.TEXT, placeholder, className = '' }: TextInputFieldProps) => {

    const { field } = useController({
        control: control,
        name: name,



    });
    return (<>
        <input
            className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
            placeholder={placeholder}
            type={type}
            {...field}


        />
        <span className="text-red-400">
            {errMsg}
        </span>
    </>)

}
export const TextAreaField = ({ name, control, defaultValue = '', errMsg = '', placeholder }: TextAreaFieldProps) => {
    const { field } = useController({

        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (<>
        <textarea
            placeholder={placeholder}
            {...field}
            rows={2}
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"



        />
        <span className="text-red-500 text-sm">{errMsg}</span>


    </>)
}
export interface SingleImageUploaderProps {
    id?: string,
    errMsg?: string,
    control: any,
    name: string,
    setError: Function,
    className?: string
    onImageChange?: Function


}

export const SingleImageUploader = ({ name, control, setError, errMsg = '', className = '' }: SingleImageUploaderProps) => {
    const { field } = useController({
        control: control,
        name: name,


    })

    const [thumb, setThumb] = useState();

    return (<>
        <div className="flex flex-row">
            <div className=" w-2/3 flex flex-col">
                <input


                    className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${className} `}
                    id="image"
                    type="file"
                    onChange={(e: any) => {

                        let image = e.target.files[0];
                        console.log(image)
                        let extension = image.name.split(".").pop(); //image.png => {"image","png"} =>'png'
                        let allowed = import.meta.env.VITE_APP_ALLOWED_EXT.split(",");
                        if (allowed.includes(extension.toLowerCase())) {

                            if (image.size <= 3145728) {
                                setThumb(image)
                                field.onChange(image)

                            } else {
                                console.log("hey whats up")
                                setError(name, "File size is too large");
                                setThumb(undefined)
                            }

                        } else {
                            setError(name, "Image format not supported")
                            setThumb(undefined)
                        }




                    }}


                />
                <span className="text-red-500 text-sm">{errMsg}</span>

            </div>
            <div className="w-1/3 flex">
                <img src={
                    thumb && typeof thumb === "object" ? URL.createObjectURL(thumb) : "https://placehold.co/400?text=Upload"
                } alt=""></img>

            </div>
        </div>
    </>)

}
export const BannerImageUploader = ({ name, control, setError, errMsg = '', className = '' }: SingleImageUploaderProps) => {
    const { field } = useController({
        control: control,
        name: name,


    })


    return (<>
        <div className="flex flex-row">

            <input


                className={` h-8 opacity-1 cursor-pointer ${className} `}
                id="image"
                type="file"
                onChange={(e: any) => {

                    let image = e.target.files[0];
                    console.log(image)
                    let extension = image.name.split(".").pop(); //image.png => {"image","png"} =>'png'
                    let allowed = import.meta.env.VITE_APP_ALLOWED_EXT.split(",");
                    if (allowed.includes(extension.toLowerCase())) {

                        if (image.size <= 3145728) {
                            field.onChange(image)

                        } else {
                            console.log("hey whats up")
                            setError(name, "File size is too large");

                        }

                    } else {
                        setError(name, "Image format not supported")

                    }


                }}


            />
            <span className="text-red-500 text-sm">{errMsg}</span>


        </div>
    </>)

}
export const CategoryImageUploader = ({ name, control, setError, errMsg = '', className = '' }: SingleImageUploaderProps) => {
    const { field } = useController({
        control: control,
        name: name,


    })


    return (<>
        <div className="flex flex-row">

            <input


                className={` h-8 opacity-1 cursor-pointer ${className} `}
                id="image"
                type="file"
                onChange={(e: any) => {

                    let image = e.target.files[0];
                    console.log(image)
                    let extension = image.name.split(".").pop(); //image.png => {"image","png"} =>'png'
                    let allowed = import.meta.env.VITE_APP_ALLOWED_EXT.split(",");
                    if (allowed.includes(extension.toLowerCase())) {

                        if (image.size <= 3145728) {
                            field.onChange(image)

                        } else {
                            console.log("hey whats up")
                            setError(name, "File size is too large");

                        }

                    } else {
                        setError(name, "Image format not supported")

                    }


                }}


            />
            <span className="text-red-500 text-sm">{errMsg}</span>


        </div>
    </>)

}
export const BrandImageUploader = ({ name, control, setError, errMsg = '', className = '' }: SingleImageUploaderProps) => {
    const { field } = useController({
        control: control,
        name: name,


    })


    return (<>
        <div className="flex flex-row">

            <input


                className={` h-8 opacity-1 cursor-pointer ${className} `}
                id="image"
                type="file"
                onChange={(e: any) => {

                    let image = e.target.files[0];
                    console.log(image)
                    let extension = image.name.split(".").pop(); //image.png => {"image","png"} =>'png'
                    let allowed = import.meta.env.VITE_APP_ALLOWED_EXT.split(",");
                    if (allowed.includes(extension.toLowerCase())) {

                        if (image.size <= 3145728) {
                            field.onChange(image)

                        } else {
                            console.log("hey whats up")
                            setError(name, "File size is too large");

                        }

                    } else {
                        setError(name, "Image format not supported")

                    }


                }}


            />
            <span className="text-red-500 text-sm">{errMsg}</span>


        </div>
    </>)

}
export const ProductImageUploader = ({ id, name, control, setError, errMsg = '', className = '', onImageChange }: SingleImageUploaderProps) => {
    const { field } = useController({
        control: control,
        name: name,



    })


    return (<>
        <div className="flex flex-row">

            <input


                className={` h-5 opacity-1 cursor-pointer ${className} `}
                id={id}
                type="file"
                multiple

                onChange={(e: any) => {

                    let image = e.target.files[0];
                    console.log(image)
                    let extension = image.name.split(".").pop(); //image.png => {"image","png"} =>'png'
                    let allowed = import.meta.env.VITE_APP_ALLOWED_EXT.split(",");
                    if (allowed.includes(extension.toLowerCase())) {

                        if (image.size <= 3145728) {
                            field.onChange(image)

                        } else {
                            console.log("hey whats up")
                            setError(name, "File size is too large");

                        }

                    } else {
                        setError(name, "Image format not supported")

                    }
                    onImageChange && onImageChange(image)


                }}



            />
            <span className="text-red-500 text-sm">{errMsg}</span>


        </div>
    </>)

}