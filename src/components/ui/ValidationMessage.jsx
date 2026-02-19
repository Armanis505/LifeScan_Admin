import { CircleAlert } from "lucide-react"

const ValidationMessage = ({ message }) => { 
    return (
        <>
            <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                <CircleAlert size={16} />
                {message}
            </div>
        </>
    )
}

export default ValidationMessage
