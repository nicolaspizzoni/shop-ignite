//[id].tsx => nome parametrizado, possuo acesso ao valor do parametro passado na URL
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ButtonSkeleton, DescriptionSkeleton, ImageContainer, ImageContainerSkeleton, PriceSkeleton, ProductContainer, ProductInfo, TitleSkeleton } from "../../styles/pages/product"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()

    if (!isFallback) {
        return (
            <ProductContainer>
                <ImageContainerSkeleton />
                <ProductInfo>
                    <TitleSkeleton />
                    <PriceSkeleton />
                    <DescriptionSkeleton />
                    <DescriptionSkeleton />
                    <ButtonSkeleton />
                </ProductInfo>
            </ProductContainer>
        )
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    placeholder="blur"
                    blurDataURL={product.imageUrl}
                />
            </ImageContainer>
            <ProductInfo>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>
                <button>
                    Comprar agora
                </button>
            </ProductInfo>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    //Constrói a página do produto cujo id é passado em params

    return {
        paths: [
            { params: { id: 'prod_N8zKzInKqtkeIj' } }
        ],
        //fallback true indica que o Next tentará pegar o id passado como parametro para renderizar outras paginas que não estejam no paths
        fallback: true,
    }
}

//tipagem do GetStaticProps<retorno, params>
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description
            }
        },
        revalidate: 60 * 60 * 1 //1 hora
    }
}