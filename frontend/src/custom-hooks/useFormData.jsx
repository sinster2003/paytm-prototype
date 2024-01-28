import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormData = (schema) => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema)
    });

    return {register, handleSubmit, errors};
}

export default useFormData;