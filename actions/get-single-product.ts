import { Products } from "@/types-db"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

const getSingleProduct = async (id : string) : Promise<Products> => {
    const res = await fetch(`${URL}/${id}`)

    return res.json()
}
export default getSingleProduct