//[id].tsx => nome parametrizado, possuo acesso ao valor do parametro passado na URL
import { useRouter } from "next/router"

export default function Product() {
    const { query } = useRouter()

    return (
        <h1>Product: {JSON.stringify(query)}</h1>
    )
}